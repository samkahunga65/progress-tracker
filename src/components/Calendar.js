import React, { useState, useEffect } from 'react'
// import {getDays} from './calendar/funcs'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBullseye, faStickyNote, faUserClock  } from '@fortawesome/free-solid-svg-icons'
import bullseyeRed from './svgs/bullseye-with-arrow.svg'
import bullseye from './svgs/bullseye-with-arrow red.svg'
import notes from './svgs/post-it.svg'
import notesRed from './svgs/post-it (1).svg'
import reminder from './svgs/clock.svg'
import reminderRed from './svgs/clock (1).svg'
import { useHistory } from 'react-router-dom'
import { getAllDays } from './firestore/getData'

const makeDays = (days) =>{
    const ht = ''
    let conc = "<div classname='day'></div>"
            ht.concat(conc)
    if(typeof days == 'number'){
        for (let i = 0; i < days; i++) {
            let conc = "<div classname='day'></div>"
            ht.concat(conc)
        }
    }
    return ht
}
function Calendar({month}) {
    const history = useHistory()
    let pp = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10]
    const dateClick = e =>{
        e.preventDefault()
        getAllDays()
        history.push('/notification')
    }
    return (
        <div className="outer">
            <div className="month">
                <h1>November</h1>
            </div>
            <div className="days">
                <p>Mon</p>
                <p>Tue</p>
                <p>Wed</p>
                <p>Thur</p>
                <p>Fri</p>
                <p>Sat</p>
                <p>Sun</p>
            </div>
        <div className="calendar">
            {pp.length > 0 && pp.map(day=>{
                return(
                <div className="day" onClick={dateClick}>
                    <div className="top"></div>
                    <div className="icons">
                        <div className="iconFa">
                        <img className="iconFa-icon" src={notes} alt="notes"/>
                        </div>
                        <div className="iconFa">
                        <img className="iconFa-icon" src={bullseye} alt="goals"/>
                        </div>
                        <div className="iconFa">
                        <img className="iconFa-icon" src={reminder} alt="reminders"/>
                        </div>
                    </div>
                    <div className="meat">

                    </div>
                </div>
                )
            })}
        </div>
        </div>
    )
}

export default Calendar
