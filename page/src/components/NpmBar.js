import React, {useRef, useState} from 'react'
import { Package } from 'react-feather'

function NpmBar() {
    const [svgColor, setSvgColor] = useState('#0496ff')
    const wrapperRef = useRef()
    const changeValues = () => {
        wrapperRef.current.style.backgroundColor = '#0496ff'
        setSvgColor('#fff')
    }
    const resetValues = () => {
        wrapperRef.current.style.backgroundColor = 'white'
        setSvgColor('#0496ff')
    }
    const openNPMPackageInNewWindow = () => {
        window.open('https://www.npmjs.com/org/solaristudio', '_blank')
    }
    return (
        <div className={'NpmBar'}>
            <div
                onClick={openNPMPackageInNewWindow}
                ref={wrapperRef}
                onMouseEnter={changeValues}
                onMouseLeave={resetValues}
                className={'iconWrapper anim'}>
                <Package color={svgColor} size={32} />
            </div>
            <style jsx>
                {`
                    .NpmBar {
                        position: absolute;
                        top: 40px;
                        right: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .NpmBar .iconWrapper {
                        padding: 6px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 4px;
                        border: 2px solid var(--color-accent);
                    }

                    .NpmBar .iconWrapper:hover {
                        cursor: pointer;
                    }

                    .NpmBar .iconWrapper svg {
                    }
                `}
            </style>
        </div>
    )
}

export default NpmBar
