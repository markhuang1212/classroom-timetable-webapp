import React from 'react'
import './DetailPage.css'

const DetailPage = props => {
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
                </div>
            </div>
        </div>
    )
}

export default DetailPage