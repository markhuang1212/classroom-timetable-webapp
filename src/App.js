import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
    const [searchMode, setSearchMode] = useState('quick')
    const [inputText, setInputText] = useState('')
    const searchInput = useRef(null)
    const searchButton = useRef(null)

    const switchMode = () => {
        setSearchMode(searchMode === 'quick' ? 'advanced' : 'quick')
    }

    const onSearch = () => {
        console.log(`Search: ${inputText}`)
    }

    useEffect(() => {
        searchInput.current.addEventListener('keyup', e => {
            if (e.keyCode === 13) {
                e.preventDefault()
                searchButton.current.click()
            }
        })
    }, [])

    return (
        <div className="App">
            <div className="AppBar">
                <div><span>Free Classroom&nbsp;</span>@ UST</div>
            </div>
            <div className="AppContent">
                <div className="scrollable">
                    <div className="AppModeSelector">
                        <span onClick={() => switchMode()}
                            className={
                                searchMode === 'quick' ? 'current' : 'non-current'
                            }>Quick</span>&nbsp;|&nbsp;
                    <span onClick={() => switchMode()}
                            className={
                                searchMode === 'advanced' ? 'current' : 'non-current'
                            }>Advanced</span>
                    </div>
                    <div className="AppSearchBox">
                        <input ref={searchInput} value={inputText} onChange={e => setInputText(e.target.value)}></input>
                        <i className="material-icons" ref={searchButton} onClick={() => onSearch()}>arrow_forward</i>
                    </div>
                    <div className="AppResult">
                        Result Shows Here.
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
