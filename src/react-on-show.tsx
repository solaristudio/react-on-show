import throttle from 'lodash/throttle'

type ErrorFunction = () => never

enum Direction {
    UP,
    DOWN,
}

type ConditionFunction = (graphics: Graphics) => boolean

type Conditions = [
    ConditionFunction,
    ConditionFunction,
    ConditionFunction,
    ConditionFunction
]

interface OnShowOptions {
    [index: string]: number | boolean | Function | Conditions | undefined
    once?: boolean
    throttleInterval?: number
    conditionSet?: Conditions
}

const defaultOnShowOptions: OnShowOptions = {
    once: true,
    throttleInterval: 100,
    conditionSet: [
        function (graphics: Graphics) {
            return (
                graphics.windowHeightValue >=
                graphics.selectedComponentClientRect.y
            )
        },
        function (graphics: Graphics) {
            return (
                graphics.selectedComponentClientRect.y <=
                -graphics.selectedComponentClientRect.height
            )
        },
        function (graphics: Graphics) {
            return (
                graphics.selectedComponentClientRect.y >=
                -graphics.selectedComponentClientRect.height
            )
        },
        function (graphics: Graphics) {
            return (
                graphics.windowHeightValue <=
                graphics.selectedComponentClientRect.y
            )
        },
    ],
}

/**
 * Merges two OnShowOptions instances prioritising the instance given as an argument instead of the default one.
 * @param o1 {OnShowOptions}
 * @param o2 {OnShowOptions}
 */
const mergeOptions = (o1: OnShowOptions, o2: OnShowOptions): OnShowOptions => {
    const keys = ['once', 'throttleInterval', 'conditionSet']
    const newInstance = {} as OnShowOptions
    for (const key of keys) {
        newInstance[key] = o1[key] === undefined ? o2[key] : o1[key]
    }
    return newInstance
}

type Graphics = {
    windowHeightValue: number
    selectedComponentClientRect: DOMRect
}

interface FunctionSet {
    enter: Function
    leave?: Function
}

/**
 * Attaches a handler to the window scroll event.
 * @param element {HTMLElement} An HTML element for the event
 * @param functions {FunctionSet} An object containing event handlers
 * @param functions.enter A function which is triggered when the enter condition is satisfied
 * @param functions.leave A function which is triggered when the leave condition is satisfied
 * @param options {OnShowOptions} Contains options for the onShow event
 * @param options.once A value indicating that the event should be triggered only once
 * @param options.throttleInterval A value indicates the frequency between triggers of event listener
 * @param options.conditionSet is an array of functions with four elements. There are two directions: up and down. They are determined by the acceleration. As an example, down means user is scrolling down. So the structure of conditionSet is like that: [down-enter, down-leave, up-enter, up-leave] Enter and leave are dependent on the current direction.
 * @see https://stackoverflow.com/questions/25991367/difference-between-throttling-and-debouncing-a-function Throttling
 */
export function onShow(
    element: HTMLElement,
    functions: FunctionSet,
    options?: OnShowOptions
): void | ErrorFunction {
    if (!functions.leave && options?.once === false)
        return (): never => {
            throw new (class extends Error {
                constructor() {
                    super(
                        'onShow function with [once=false] must contain exit in its functions argument.'
                    )
                }
            })()
        }
    let f: (event?: Event) => void
    const currentOptions: OnShowOptions = mergeOptions(
        options || {},
        defaultOnShowOptions
    )
    let y0 = element.getBoundingClientRect().y
    const calculateDirection = (y: number): Direction => {
        const direction = y > y0 ? Direction.UP : Direction.DOWN
        y0 = y
        return direction
    }
    let direction: Direction
    const directionSets = [
        [0, 1],
        [2, 3],
    ]
    let lockIndex = -1
    let isOutOfBoundary
    let isInsideBoundary
    let olderGraphics = {
        windowHeightValue: window.innerHeight,
        selectedComponentClientRect: element.getBoundingClientRect(),
    }
    window.addEventListener(
        'scroll',
        (f = throttle((): void | ErrorFunction => {
            const windowHeightValue = window.innerHeight
            const selectedComponentClientRect = element.getBoundingClientRect()
            direction = calculateDirection(selectedComponentClientRect!.y)
            if (currentOptions.conditionSet === undefined)
                return () => {
                    throw new Error('Conditions is undefined.')
                }
            const graphics: Graphics = {
                windowHeightValue,
                selectedComponentClientRect,
            }
            const [condF1, condF2, condF3, condF4] = currentOptions.conditionSet
            const [cond1, cond2, cond3, cond4] = [
                condF1(graphics),
                condF2(graphics),
                condF3(graphics),
                condF4(graphics),
            ]
            const directionSet =
                direction === Direction.DOWN
                    ? directionSets[0]
                    : directionSets[1]
            isOutOfBoundary = [
                condF2(graphics) && condF2(olderGraphics),
                condF4(graphics) && condF4(olderGraphics),
            ]
            isInsideBoundary = [
                condF1(graphics) && condF1(olderGraphics),
                condF3(graphics) && condF3(olderGraphics),
            ]
            olderGraphics = graphics
            const status = [
                direction === Direction.DOWN &&
                    cond1 &&
                    !cond2 &&
                    !(isInsideBoundary[0] && isInsideBoundary[1]),
                direction === Direction.DOWN &&
                    cond1 &&
                    cond2 &&
                    !isOutOfBoundary[0],
                direction === Direction.UP &&
                    cond3 &&
                    !cond4 &&
                    !(isInsideBoundary[0] && isInsideBoundary[1]),
                direction === Direction.UP &&
                    cond3 &&
                    cond4 &&
                    !isOutOfBoundary[1],
            ]
            const locks = [
                status[0] && lockIndex !== 0,
                status[1] && lockIndex !== 1,
                status[2] && lockIndex !== 2,
                status[3] && lockIndex !== 3,
            ]
            lockIndex = status[0]
                ? 0
                : status[1]
                ? 1
                : status[2]
                ? 2
                : status[3]
                ? 3
                : -1
            functions.leave = functions.leave ? functions.leave : () => {}
            if (
                locks[directionSet[0]] &&
                currentOptions.conditionSet[directionSet[0]]
            ) {
                functions.enter()
                if (currentOptions.once) window.removeEventListener('scroll', f)
            } else if (
                locks[directionSet[1]] &&
                currentOptions.conditionSet[directionSet[1]]
            ) {
                functions.leave()
            }
        }, currentOptions.throttleInterval))
    )
    f()
}

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

OnShow.propTypes = {
    handlers: PropTypes.shape({
        enter: PropTypes.func.isRequired,
        leave: PropTypes.func,
    }).isRequired,
    once: PropTypes.bool,
    throttleInterval: PropTypes.number,
    conditionSet: PropTypes.arrayOf(PropTypes.func),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

interface Props {
    handlers: FunctionSet
    once?: boolean
    throttleInterval?: number
    conditionSet?: Conditions
    children: JSX.Element | Array<JSX.Element>
}

/**
 * Creates an OnShow React component.
 * @return {JSX.Element}
 * @see onShow
 * @constructor
 */
export function OnShow(props: Props): JSX.Element {
    const ref = useRef(null)
    useEffect(() => {
        onShow(ref.current ?? document.body, props.handlers, {
            once: props.once,
            throttleInterval: props.throttleInterval,
            conditionSet: props.conditionSet,
        })
    }, [])
    return (
        <div ref={ref}>
            {props.children}
        </div>
    )
}
