import React, { useState, useEffect } from 'react'
import './DetailPage.css'
import { getTimeTable, filterDay, extractTime, formatTime } from './data-filter.js'

const DetailPage = props => {
    const dayTable = {
        '1': 'MONDAY',
        '2': 'TUESDAY',
        '3': 'WEDNESDAY',
        '4': 'THURSDAY',
        '5': 'FRIDAY'
    }

    let _day = (new Date()).getDay()
    _day = (_day == 6 || _day == 0) ? 1 : _day
    const [day, setDay] = useState(_day)

    const [timetable, setTimetable] = useState(getTimeTable())
    let filteredData = []

    const onBack = () => {
        window.location.hash = '/'
    }

    if (props.detailRoom.raw) {
        filteredData = filterDay(timetable[props.detailRoom.raw], day)
        filteredData = extractTime(filteredData)
        filteredData = formatTime(filteredData)
    }

    const onPrevDay = () => {
        if (day != 1) {
            setDay(day - 1)
        }
    }

    const onNextDay = () => {
        if (day != 5) {
            setDay(day + 1)
        }
    }

    return (
        <div className="DetailPage">
            <div className="AppBar">
                <i className="material-icons" onClick={() => onBack()}>arrow_back</i>
                Classroom Info
            </div>
            <div className="AppContent">
                <div className="scrollable">
                    <div className="RoomTitle">
                        <div className="desc">{props.detailRoom.desc}</div>
                        <div className="no">{props.detailRoom.room}</div>
                    </div>
                    <div className="TimeViewer">
                        <div className="day">{dayTable[day]}</div>
                        <div className="ViewerBody">
                            <i className="material-icons" onClick={() => onPrevDay()}>navigate_before</i>
                            <div className="textLeft">
                                textl
                            </div>
                            <div className="ViewerDiag">
                                {filteredData.map((v, i) => {
                                    const [start, end] = v.split(' ')
                                    return (<div key={i} style={{
                                        width: '100%',
                                        backgroundColor: '#878787',
                                        borderRadius: '4px',
                                        height: `${360 * (end - start) / 1300}px`,
                                        position: 'absolute',
                                        left: '0px',
                                        right: '0px',
                                        top: `${360 * (start - 900) / 1300}px`
                                    }}></div>)
                                })}
                            </div>
                            <div className="textRight">
                                textr
                            </div>
                            <i className="material-icons" onClick={() => onNextDay()}>navigate_next</i>
                        </div>
                    </div>
                    {JSON.stringify(filteredData, null, 2)}
                </div>
            </div>
        </div>
    )
}

export default DetailPage