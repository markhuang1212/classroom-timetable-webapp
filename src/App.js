import React, { useState } from 'react';
import './App.css';

function App() {
    const [searchMode, setSearchMode] = useState('quick')
    const switchMode = () => {
        setSearchMode(searchMode == 'quick' ? 'advanced' : 'quick')
    }

    return (
        <div className="App">
            <div className="AppBar">
                <div style={{ marginLeft: '24px' }}><span>Find Free Classroom&nbsp;</span>@ UST</div>
            </div>
            <div className="AppContent">
                <div className="AppModeSelector">
                    <span onClick={() => switchMode()}
                        className={
                            searchMode == 'quick' ? 'current' : 'non-current'
                        }>Quick</span>&nbsp;|&nbsp;
                    <span onClick={() => switchMode()}
                        className={
                            searchMode == 'advanced' ? 'current' : 'non-current'
                        }>Advanced</span>
                </div>
                <div className="AppSearchBox">
                    <input></input>
                    <i className="material-icons">arrow_forward</i>
                </div>
            </div>
        </div>
    );
}

export default App;
