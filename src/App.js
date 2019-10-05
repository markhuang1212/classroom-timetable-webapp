import React, { useState, useRef, useEffect } from 'react';
import dataFilter from './data-filter'
import './App.css';

function App() {
    const [inputText, setInputText] = useState('')
    const [results, setResults] = useState([])
    const [numOfFree, setNumOfFree] = useState(0)
    const searchInput = useRef(null)
    const searchButton = useRef(null)
    const noticeBox = useRef(null)

    useEffect(() => {

        const day = (new Date()).getDay()
        if (day == 6 || day == 0) {
            noticeBox.current.style.display = 'block'
        }

        const filteredData = dataFilter()

        setNumOfFree(filteredData.filter(v => v.room != 'TBA').length)
        setResults(filteredData.map(v => {
            return {
                // room: v.split(',')[0].replace('Lecture Theater ', 'LT').split(' (')[0],
                room: v.room.split(', ')[0].split(' (')[0].replace('Lecture Theater ', 'LT'),
                desc: v.room.split(', ')[1] ? v.room.split(', ')[1].split(' (')[0] : '',
                until: v.until
            }
        }))
    }, [])

    return (
        <div className="App">
            <div className="AppBar">
                <div><span>Free Classroom&nbsp;</span>@ UST</div>
            </div>
            <div className="AppContent">
                <div className="scrollable">
                    <div className="AppNoticeCont">
                        <div ref={noticeBox} className="AppIntroNotice">
                            Don't use this app on weekends since all classrooms are locked.
                        </div>
                        <div className="AppClassroomNotice">
                            {numOfFree} Classrooms <br />
                            are currently free.
                        </div>
                    </div>
                    <div className="AppSearchBox">
                        <input ref={searchInput}
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            placeholder="Lift/Building/Room"></input>
                        <i className="material-icons" ref={searchButton}>arrow_forward</i>
                    </div>
                    <div className="AppResult">
                        {results.filter(v => v.room.toUpperCase().includes(inputText.toUpperCase()) || v.desc.toUpperCase().includes(inputText.toUpperCase()))
                            .filter(v => v.room != 'TBA')
                            .map((v, i) => {
                                let hr = i < results.length - 1 ? (<hr />) : ''
                                return (
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
                                )
                            })}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default App;
