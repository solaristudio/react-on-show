type TestObject = {
    _w: number,
    _y: number
}

/**
 * Attaches a handler to the window scroll event and removes it when element is shown.
 * @param element {HTMLElement} An HTML element for the event
 * @param func {Function} A function to be fired when the element is shown on the viewport
 * @param __testSuite__ {{_w: number, _y: number}} A unique object for unit testing
 */
export function onShow(element: HTMLElement, func: Function, __testSuite__?: TestObject) {
    let f: (event?: Event) => void
    window.addEventListener(
        'scroll',
        (f = () => {
            const windowHeightValue = __testSuite__
                ? __testSuite__._w
                : window.innerHeight
            const selectedComponentRelativeTopValue = __testSuite__
                ? __testSuite__._y
                : element.getBoundingClientRect().y
            if (windowHeightValue >= selectedComponentRelativeTopValue) {
                func()
                window.removeEventListener('scroll', f)
            }
        })
    )
    f()
}

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

OnShow.propTypes = {
    handler: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

interface Props {
    handler: (event: Event) => void,
    children: JSX.Element | Array<JSX.Element>
}

/**
 * Creates an OnShow React component.
 * @param props.handler {Function} A function to be invoked when the onShow event is triggered
 * @param props.children The content that is sent inside the component
 * @return {JSX.Element}
 * @constructor
 */
export function OnShow(props: Props) {
    const ref = useRef(null)
    useEffect(() => {
        onShow(ref.current ?? document.body, props.handler)
        return () => {
            window.removeEventListener('onScroll', props.handler)
        }
    }, [])
    return <div ref={ref}>{props.children}</div>
}
