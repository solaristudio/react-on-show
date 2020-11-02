type TestObject = {
    windowHeight: number
    ComponentClientRect: DOMRect
}

const testObject = {
    windowHeight: -1,
    ComponentClientRect: document.createElement('div').getBoundingClientRect()
} as TestObject

let isTest = false

export function enableTestMode() {
    isTest = true
    return testObject
}

type Nullable<T> = T | null

type OnShowOptions = {
    [index: string]: number | undefined | null
    offset?: Nullable<number>,
    delay?: Nullable<number>
}

/**
 * Attaches a handler to the window scroll event and removes it when element is shown.
 * @param element {HTMLElement} An HTML element for the event
 * @param func {Function} A function to be fired when the element is shown on the viewport
 * @param options {OnShowOptions} A couple of options for making the event more specialised
 */
export function onShow(
    element: HTMLElement,
    func: Function,
    options?: OnShowOptions
) {
    if (options === undefined) options = {} as OnShowOptions
    const defaultValues = [0, 0]
    const keys = ['offset', 'delay']
    for (let i = 0; i < keys.length; ++i) {
        options[keys[i]] = options[keys[i]] ? options[keys[i]] : defaultValues[i]
    }
    let f: (event?: Event) => void
    window.addEventListener(
        'scroll',
        (f = () => {
            const windowHeightValue = isTest
                ? testObject.windowHeight
                : window.innerHeight
            const selectedComponentRelativeTopValue = isTest
                ? testObject.ComponentClientRect.y
                : element.getBoundingClientRect().y
            if (windowHeightValue >= selectedComponentRelativeTopValue + options!.offset!) {
                options!.delay !== 0 ? setTimeout(func, options!.delay as number) : func()
                window.removeEventListener('scroll', f)
            }
        })
    )
    f()
}

import React, { useEffect, useRef } from 'react'
import PropTypes, { InferProps } from 'prop-types'

OnShow.propTypes = {
    handler: PropTypes.func.isRequired,
    offset: PropTypes.number,
    delay: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

/**
 * Creates an OnShow React component.
 * @param props.handler A function to be invoked when the onShow event is triggered
 * @param props.offset  A value for changing the y value for the trigger
 * @param props.delay  A value for delaying the execution of the handler
 * @param props.children Component children
 * @return {JSX.Element}
 * @constructor
 */
export function OnShow(props: InferProps<typeof OnShow.propTypes> ){
    const ref = useRef(null)
    useEffect(() => {
        onShow(ref.current ?? document.body, props.handler, {
            offset: props.offset,
            delay: props.delay
        })
        return () => {
            window.removeEventListener('onScroll', props.handler)
        }
    }, [])
    return <div ref={ref}>{props.children}</div>
}
