import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

OnShow.propTypes = {
    handler: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

/**
 * @class
 * Represents OnShowHandlerIsNotFound.
 * Intended to be invoked when the core event handler is not found
 */
export class OnShowHandlerIsNotFound extends Error {
    constructor(message = 'Handler function for onShow event is not defined.') {
        super(message)
        this.name = OnShowHandlerIsNotFound.name
    }
}

/**
 * Creates an OnShow React component.
 * @param handler {Function} A function to be invoked when the onShow event is triggered
 * @param children The content that is sent inside the component
 * @return {JSX.Element}
 * @constructor
 */
export function OnShow({ handler, children }) {
    const onShowFunc = onShow
        ? onShow
        : () => throw new OnShowHandlerIsNotFound()
    const ref = useRef(null)
    useEffect(() => {
        onShowFunc(ref.current, handler)
        return () => {
            window.removeEventListener('onScroll', handler)
        }
    }, [])
    return <div ref={ref}>{children}</div>
}
