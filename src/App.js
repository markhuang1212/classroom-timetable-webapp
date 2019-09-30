import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const egResult = [{
    room: 'ROOM 4502',
    until: '14:30'
}, {
    room: 'G101, CYT',
    until: '12:30'
}]

function App() {
    const [searchMode, setSearchMode] = useState('quick')
    const [inputText, setInputText] = useState('')
    const [results, setResults] = useState([])
    const searchInput = useRef(null)
    const searchButton = useRef(null)

    const switchMode = () => {
        setSearchMode(searchMode === 'quick' ? 'advanced' : 'quick')
    }

    const onSearch = () => {
        console.log(`Search: ${inputText}`)
        setResults(egResult)
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
                            }>Quick Search</span>&nbsp;|&nbsp;
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
                        {results.map(v => {
                            return (
                                <div className="ResultItem">
                                    <div className="RoomNo">{v.room}</div>
                                    <div className="FreeUntilCont">
                                        <div>Free Until:</div>
                                        <div>{v.until}</div>
                                    </div>
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
