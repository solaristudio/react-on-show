import throttle from 'lodash/throttle'

type Nullable<T> = T | null
type ErrorFunction = () => never
type ConditionFunction = (graphics: Graphics) => boolean
type Conditions = [
    ConditionFunction,
    ConditionFunction,
    ConditionFunction,
    ConditionFunction
]
type Graphics = {
    windowHeightValue: number
    selectedComponentClientRect: DOMRect
}

enum Direction {
    UP,
    DOWN,
}

interface OnShowOptions {
    [index: string]: number | boolean | Function | Conditions | undefined
    once?: boolean
    throttleInterval?: number
    conditionSet?: Conditions
}

interface FunctionSet {
    enter: Function
    leave?: Nullable<Function>
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
            throw new Error('onShow function with [once=false] must contain exit in its functions argument.')
        }
    let f: (event?: Event) => void
    const keys = ['once', 'throttleInterval', 'conditionSet']
    const defaultValues = [
        true,
        50,
        [
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
        ] as Conditions,
    ]
    if (options === undefined) options = {} as OnShowOptions
    for (let i = 0; i < keys.length; ++i) {
        options[keys[i]] = options[keys[i]] === undefined ? defaultValues[i] : options[keys[i]]
    }
    let y0 = element.getBoundingClientRect().y
    const calculateDirection = (y: number): Direction => {
        const direction = y > y0 ? Direction.UP : Direction.DOWN
        y0 = y
        return direction
    }
    const initialGraphics: Graphics = {
        windowHeightValue: window.innerHeight,
        selectedComponentClientRect: element.getBoundingClientRect()
    }
    const isInside = (graphics: Graphics): boolean => {
        return options!.conditionSet![0](graphics) && options!.conditionSet![2](graphics)
    }
    let isInsideOld = isInside(initialGraphics)
    let direction: Direction
    window.addEventListener(
        'scroll',
        (f = throttle((): void | ErrorFunction => {
            const windowHeightValue = window.innerHeight
            const selectedComponentClientRect = element.getBoundingClientRect()
            direction = calculateDirection(selectedComponentClientRect!.y)
            if (options!.conditionSet === undefined)
                return () => {
                    throw new Error('Conditions is undefined.')
                }
            const graphics: Graphics = {
                windowHeightValue,
                selectedComponentClientRect,
            }
            let isInsideNew = isInside(graphics)
            const [b0, b1, b2, b3] = (() => {
                if ((!isInsideNew && !isInsideOld) || (isInsideNew && isInsideOld)) return [false, false, false, false]
                else if (!isInsideNew && isInsideOld)
                    return direction === Direction.DOWN ? [false, true, false, false] : [false, false, false, true]
                else if (isInsideNew && !isInsideOld)
                    return direction === Direction.DOWN ? [true, false, false, false] : [false, false, true, false]
                return []
            })()
            isInsideOld = isInsideNew
            functions.leave = functions.leave ? functions.leave : () => {}
            if (
                b0 || b2
            ) {
                functions.enter()
                if (options!.once) window.removeEventListener('scroll', f)
            } else if (
                b1 || b3
            ) {
                functions.leave()
            }
        }, options.throttleInterval))
    )
    f()
}

type Props<T> = T | undefined

import React, { useEffect, useRef } from 'react'
import PropTypes, { InferProps } from 'prop-types'

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

/**
 * Creates an OnShow React component.
 * @return {JSX.Element}
 * @see onShow
 * @constructor
 */
export function OnShow(props: InferProps<typeof OnShow.propTypes>): JSX.Element {
    const ref = useRef(null)
    useEffect(() => {
        onShow(ref.current ?? document.body, props.handlers, {
            once: props.once as Props<boolean>,
            throttleInterval: props.throttleInterval as Props<number>,
            conditionSet: props.conditionSet as Props<Conditions>,
        })
    }, [])
    return <div ref={ref}>{props.children}</div>
}
