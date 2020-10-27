import React from 'react'
import Anchor from '../native/Anchor'
import { Heart } from 'react-feather'

function Footer() {
    return (
        <>
            <div className={'Footer'}>
                <div style={{ textAlign: 'left' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 8,
                        }}>
                        Powered By
                        <Anchor
                            margins={[0, 0, 0, 8]}
                            style={{
                                backgroundColor: 'white',
                                padding: 4,
                                borderRadius: 2
                            }}
                            link={'https://github.com/solaristudio'}
                            content={
                                <img
                                    className={'org'}
                                    width={18}
                                    src={'planet_blue_icon.png'}
                                    alt={'Planet'}
                                />
                            }
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        Made with{' '}
                        <Heart
                            style={{ marginLeft: 4, marginRight: 4 }}
                            size={18}
                            fill={'#fff'}
                        />
                        on &nbsp;
                        <div style={{ fontWeight: 'bold' }}>{'{ React }'}</div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .Footer {
                        font-size: 0.9rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 40px 0;
                        background-color: var(--color-accent);
                        color: white;
                        text-align: center;
                        user-select: none;
                    }

                    .Footer .org:hover {
                        cursor: pointer;
                    }
                `}
            </style>
        </>
    )
}

export default Footer
