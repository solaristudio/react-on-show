import React, { useState } from 'react'
import './App.css'
import Headline from './components/Headline'
import Home from './components/pages/Home'
import NavigationBar from './components/NavigationBar'
import NpmBar from './components/NpmBar'
import Footer from './components/Footer'

function App() {
    const [currentPage, setCurrentPage] = useState(<Home />)
    return (
        <>
            <div className={'App'}>
                <div className={'Body'}>
                    <Headline />
                    <NpmBar />
                    <NavigationBar
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                    {currentPage}
                </div>
                <Footer />
            </div>
            <style jsx>
                {`
                    .App {
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                    }
                    .Body {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: 10vw;
                    }
                `}
            </style>
        </>
    )
}

export default App
