import React, { useState } from 'react'
import './DetailPage.css'
import { getTimeTable, filterDay, extractTime, formatTime } from './data-filter.js'
import { parse } from 'querystring'

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

    const calcMin = (start, end) => {
        const [startH, startM] = [parseInt(start.slice(0, 2)), parseInt(start.slice(2, 4))]
        const [endH, endM] = [parseInt(end.slice(0, 2)), parseInt(end.slice(2, 4))]
        const [H, M] = [endH - startH, endM - startM]
        return (H * 60 + M)
    }

    console.log(calcMin('0930', '1020'))

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
                            <i className="material-icons" onClick={() => onPrevDay()} disabled={day == 1}>navigate_before</i>
                            <div className="textLeft">
                                {(() => {
                                    let times = []
                                    filteredData.forEach(v => {
                                        const [start, end] = v.split(' ')
                                        times.push(start)
                                        times.push(end)
                                    })
                                    return times
                                })().map((time, i) => {
                                    const mod = i % 2 == 0 ? 5 : -5
                                    return (<div key={i} style={{
                                        position: "absolute",
                                        top: `${360 * calcMin('0900', parseInt(time) > 2100 ? '2100' : time) / 720 + mod - 8}px`,
                                        textAlign: 'right',
                                        width: '100%'
                                    }}>{time.slice(0, 2)}:{time.slice(2)}</div>)
                                })}
                            </div>
                            <div className="ViewerDiag">
                                <hr style={{
                                    width: 'calc(100% - 2px)',
                                    position: 'absolute',
                                    borderStyle: 'solid',
                                    margin: '0px',
                                    borderColor: '#65CC2F',
                                    zIndex: '2',
                                    top: (() => {
                                        const now = new Date()
                                        let [H, M] = [now.getHours(), now.getMinutes()]
                                        H = H < 10 ? `0${H}` : H
                                        M = M < 10 ? `0${M}` : M
                                        let timeCode = `${H}${M}`
                                        if (parseInt(timeCode) < 900) {
                                            timeCode = '0900'
                                        }
                                        if (parseInt(timeCode) > 2100) {
                                            timeCode = '2100'
                                        }
                                        return `${360 * calcMin('0900', timeCode) / 720}px`
                                    })()
                                }} />
                                {filteredData.map((v, i) => {
                                    const [start, end] = v.split(' ')
                                    return (<div key={i} style={{
                                        width: '100%',
                                        backgroundColor: '#878787',
                                        borderRadius: '4px',
                                        height: `${360 * calcMin(start, parseInt(end) > 2100 ? '2100' : end) / 720}px`,
                                        position: 'absolute',
                                        left: '0px',
                                        right: '0px',
                                        top: `${360 * calcMin('0900', start) / 720}px`
                                    }}></div>)
                                })}
                            </div>
                            <div className="textRight">
                                {(() => {
                                    const now = new Date()
                                    let [H, M] = [now.getHours(), now.getMinutes()]
                                    H = H < 10 ? `0${H}` : H
                                    M = M < 10 ? `0${M}` : M
                                    let timeCode = `${H}${M}`
                                    let _timeCode = timeCode
                                    if (parseInt(_timeCode) < 900) {
                                        _timeCode = '0900'
                                    }
                                    if (parseInt(_timeCode) > 2100) {
                                        _timeCode = '2100'
                                    }
                                    return (<div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        top: `${360 * calcMin('0900', _timeCode) / 720 - 8}px`
                                    }}>{timeCode.slice(0, 2)}:{timeCode.slice(2)}</div>)
                                })()}
                            </div>
                            <i className="material-icons" onClick={() => onNextDay()} disabled={day == 5}>navigate_next</i>
                        </div>
                    </div>
                    {/* {JSON.stringify(filteredData, null, 2)} */}
                </div>
            </div>
        </div>
    )
}

export default DetailPage