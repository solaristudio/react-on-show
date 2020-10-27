import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

TextArea.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
}

TextArea.defaultProps = {
    styles: {},
}

function TextArea(props) {
    const copy = useCallback(() => {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.value = props.text
        input.select()
        document.execCommand('copy')
        input.remove()
    }, [props.text])
    return (
        <>
            <div
                style={{ ...props.style }}
                onClick={copy}
                className={'TextArea anim'}>
                {props.text}
            </div>
            <style jsx>
                {`
                    .TextArea {
                        display: inline-block;
                        background-color: rgba(4, 150, 255, 0.05);
                        color: var(--color-accent);
                        border-radius: 4px;
                        align-self: center;
                        user-select: none;
                        cursor: pointer;
                    }

                    .TextArea:hover {
                        background-color: rgba(4, 150, 255, 0.1);
                    }
                `}
            </style>
        </>
    )
}

export default TextArea
