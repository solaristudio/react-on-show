import React from 'react'
import TextArea from '../../native/TextArea'
import Anchor from '../../native/Anchor'

function QuickStart() {
    return (
        <>
            <div className={'quickStart'}>
                <div className={'title header'}>How to Start?</div>
                <div className={'subtitle header'}>Installation</div>
                <div className={'content-text'}>
                    react-on-show is a library for enabling on-show event in
                    React. You can install the library via{' '}
                    <Anchor
                        style={{ color: '#0496ff' }}
                        content={'NPM'}
                        link={'https://www.npmjs.com/'}
                    />
                    , a package manager for Node like below:
                </div>
                <div className={'vertical'} />
                <TextArea
                    style={{ padding: 10 }}
                    text={'npm i @solariss/react-on-show'}
                />
                <div className={'subtitle header'}>Basics</div>
                <div className={'content-text'}>
                    You can use both function and component approach to inject
                    this library. For functional approach you have to use{' '}
                    <TextArea text={'onShow'} />
                </div>
            </div>
            <style jsx>
                {`
                    .quickStart {
                        display: flex;
                        justify-content: left;
                        flex-direction: column;
                        margin-top: 40px;
                    }

                    .quickStart .header {
                        text-align: left;
                        width: 650px;
                        font-weight: bold;
                        color: var(--color-accent);
                        margin: 10px 0;
                    }

                    .quickStart .title {
                        font-size: 2rem;
                    }

                    .quickStart .subtitle {
                        font-size: 1.5rem;
                    }

                    .quickStart .content-text {
                        margin: 10px 0;
                        line-height: 1.4rem;
                    }
                `}
            </style>
        </>
    )
}

export default QuickStart
