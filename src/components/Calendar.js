import React, { useContext, useEffect, useState } from 'react'
// import {getDays} from './calendar/funcs'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBullseye, faStickyNote, faUserClock  } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom'
import { getAllDays, addNote, addGoal, addReminder, removeGoal, removeNote, doGoal, getDay, monthData } from './firestore/getData'
import { getMonth, getMonthName } from './data/generator'
import { CTX } from '../store'
import {getMonthDays} from './data/generator'
import DayOla from './day'

// const makeDays = (days) =>{
//     const ht = ''
//     let conc = "<div classname='day'></div>"
//             ht.concat(conc)
//     if(typeof days == 'number'){
//         for (let i = 0; i < days; i++) {
//             let conc = "<div classname='day'></div>"
//             ht.concat(conc)
//         }
//     }
//     return ht
// }
function Calendar() {
    const [state, dispatch] = useContext(CTX);
    const [month, setMonth] = useState([])
    const [monthName, setMonthName] = useState('')
    const history = useHistory()
    const dateClick = e =>{
        e.preventDefault()
        // doGoal(new Date(2020, 10, 3),'note')
        history.push('/notification')
    }
    useEffect(()=>{
        let today = new Date()
        let data = monthData()
        let month = today.getMonth()
        let year = today.getFullYear()
        let days = getMonthDays()
        setMonthName(getMonthName())
        let firstDay = new Date(year, month, 1).getDay()-1
        if(firstDay==-1){
            days=days+6
        }else{
            days=days+firstDay
        }
        let items = []
        for (let i = 0; i < days; i++) {
            items.push("PP"+i)
            
        }

        setMonth(items)
        dispatch({type:"ADD_MONTH", payload:{month, days}})
    }, [])
    return (
        <div className="outer">
            
            <div className="month">
                <h1>{monthName}</h1>
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
            {month && month.map((item, index)=>{
               return <DayOla key={item} place={index+1} count={month.length} />
            })}
        </div>
        </div>
    )
}

export default Calendar
