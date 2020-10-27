import React from 'react'

function Headline() {
    return (
        <>
            <div className={'Headline'}>
                <div className={'title'}>react-on-show</div>
                <div className={'subtitle'}>
                    A Robust React Event Handler When Element is Shown
                </div>
            </div>
            <style jsx>
                {`
                    .Headline {
                        font-weight: bold;
                        user-select: none;
                        text-align: center;
                        margin: 0 0 80px 0;
                    }

                    .Headline .title {
                        color: var(--color-accent);
                        font-size: 4rem;
                        margin-bottom: 4px;
                    }

                    .Headline .subtitle {
                        font-size: 1rem;
                        color: rgba(0,0,0,0.4);
                    }
                `}
            </style>
        </>
    )
}

export default Headline
