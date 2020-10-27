import React from 'react'

function Home() {
    return (
        <>
            <div className={'Home'}>
                React is deprived of an event handler that triggers when target
                element is shown in the viewport. Thus we have created an npm
                library that provides both component and function for this
                purpose. You can install it via
            </div>
            <style jsx>
                {`
                    .Home {
                        font-size: 1.2rem;
                        margin-top: 100px;
                        width: 54vw;
                        text-align: center;
                    }
                `}
            </style>
        </>
    )
}

export default Home
