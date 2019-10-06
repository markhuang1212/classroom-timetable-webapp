import React, { useState } from 'react'
import './DetailPage.css'
import { getTimeTable } from './data-filter.js'

const DetailPage = props => {

    const [timetable, setTimetable] = useState(getTimeTable())

    const onBack = () => {
        window.location.hash = '/'
    }

    return (
        <div className="DetailPage">
            <div className="AppBar">
                <i className="material-icons" onClick={() => onBack()}>arrow_back</i>
                Classroom Info
            </div>
            <div className="AppContent">
                <div className="scrollable">
                    {props.detailRoom.raw}
                    <div>
                        {JSON.stringify(timetable[props.detailRoom.raw])}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DetailPage