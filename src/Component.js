import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

OnShow.propTypes = {
    handler: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

export class OnShowHandlerIsNotFound extends Error {
    constructor(message = 'Handler function for onShow event is not defined.') {
        super(message)
        this.name = OnShowHandlerIsNotFound.name
    }
}

export function OnShow(props) {
    const onShowFunc = onShow
        ? onShow
        : () => throw new OnShowHandlerIsNotFound()
    const ref = useRef(null)
    useEffect(() => {
        onShowFunc(ref.current, props.handler)
        return () => {
            window.removeEventListener('onScroll', props.handler)
        }
    }, [])
    return <div ref={ref}>{props.children}</div>
}
