import React, { useState, useRef, useEffect } from 'react';
import dataFilter from './data-filter'
import './App.css';

function App() {
    const [searchMode, setSearchMode] = useState('quick')
    const [inputText, setInputText] = useState('')
    const [results, setResults] = useState([])
    const searchInput = useRef(null)
    const searchButton = useRef(null)

    const switchMode = () => {
        // setSearchMode(searchMode === 'quick' ? 'advanced' : 'quick')
        alert('The advance feature is still under development.')
    }

    const onSearch = () => {
        console.log(`Search: ${inputText}`)
        setResults(dataFilter().map(v => {
            return {
                // room: v.split(',')[0].replace('Lecture Theater ', 'LT').split(' (')[0],
                room: v.split(', ')[0].split(' (')[0].replace('Lecture Theater ', 'LT'),
                desc: v.split(', ')[1] ? v.split(', ')[1].split(' (')[0] : '',
                until: 'Unknown'
            }
        }))
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
                        {results.map((v, i) => (
                            <div className="ResultItem" key={i}>
                                <div className="LeftCont">
                                    <div className="RoomNo">{v.room}</div>
                                    <div className="RoomDesc">{v.desc}</div>
                                </div>
                                <div className="FreeUntilCont">
                                    <div>Free Until:</div>
                                    <div>{v.until}</div>
                                </div>
                                <i className="material-icons">keyboard_arrow_right</i>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default App;
