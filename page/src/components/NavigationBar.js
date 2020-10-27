import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Home from './pages/Home'
import Docs from './pages/Docs'
import QuickStart from './pages/QuickStart'
import { Zap } from 'react-feather'

NavigationBar.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.element.isRequired,
}

function NavigationBar(props) {
    const getComponentName = useCallback(() => {
        return props.currentPage.type.name
    }, [props.currentPage])
    const setComponent = function (component, name) {
        if (getComponentName() !== name) {
            props.setCurrentPage(component)
        }
    }
    const menus = [
        {
            content: 'Home',
            handler() {
                setComponent(<Home />, 'Home')
            },
        },
        {
            content: (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <Zap />
                    &nbsp;Quick Start
                </div>
            ),
            handler() {
                setComponent(<QuickStart />, 'Quick Start')
            },
        },
        {
            content: 'Docs',
            handler() {
                setComponent(<Docs />, 'Docs')
            },
        },
    ]
    return (
        <div className={'NavigationBar'}>
            {menus.map((menu, index) => {
                return (
                    <div
                        className={'link anim'}
                        key={index}
                        onClick={menu.handler}>
                        {menu.content}
                    </div>
                )
            })}
            <style jsx>{`
                .NavigationBar {
                    background-color: var(--color-accent);
                    margin-bottom: 40px;
                    display: flex;
                    justify-content: space-between;
                    padding: 20px 0;
                    border-radius: 4px;
                }

                .NavigationBar .link {
                    border-radius: 2px;
                    padding: 4px 12px;
                    background-color: var(--color-accent);
                    color: white;
                    font-weight: bold;
                    font-size: 1.2rem;
                    user-select: none;
                    margin: 0 64px;
                }

                .NavigationBar .link:hover {
                    color: var(--color-accent);
                    background-color: white;
                    cursor: pointer;
                }
            `}</style>
        </div>
    )
}

export default NavigationBar
