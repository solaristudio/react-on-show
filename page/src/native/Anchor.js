import React from 'react'
import PropTypes from 'prop-types'

Anchor.propTypes = {
    link: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
    margins: PropTypes.arrayOf(PropTypes.number),
    style: PropTypes.object
}

Anchor.defaultProps = {
    margins: [0, 0, 0, 0],
    object: {
        textDecoration: 'none'
    }
}

function Anchor(props) {
    return <a style={{
        ...props.style,
        display: 'inline-block',
        marginTop: props.margins[0],
        marginRight: props.margins[1],
        marginBottom: props.margins[2],
        marginLeft: props.margins[3]
    }} href={props.link} target={'_blank'} rel={'noopener noreferrer'}>{props.content}</a>
}

export default Anchor
