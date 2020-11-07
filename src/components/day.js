import React, { useContext, useEffect, useState } from 'react'
import { getMonthDays } from './data/generator'
import bullseyeRed from './svgs/bullseye-with-arrow.svg'
import bullseye from './svgs/target.svg'
import notesRed from './svgs/post-it (1).svg'
import reminderRed from './svgs/clock (1).svg'
import reminder from './svgs/clock.svg'
import { CTX } from '../store'
import { dateToText, sameDay } from './firestore/utils'
import { getDay } from './firestore/getData'
import { useHistory } from 'react-router-dom'
function DayOla({place, count}) {
    const [date, setDate] = useState('')
    const [datedt, setDatedt] = useState()
    const [goals, setGoals] = useState(false)
    const [notes, setNotes] = useState(false)
    const [reminders, setReminders] = useState(false)
    const [goalsRed, setGoalsRed] = useState(false)

    const [remindersRed, setRemindersRed] = useState(false)
    const [res, setRes] = useState()
    const [goalsDt, setGoalsDt] = useState([])
    const [notesDt, setNotesDt] = useState([])
    const [remindersDt, setRemindersDt] = useState([])
    const [state, dispatch] = useContext(CTX);
    const history = useHistory()
    const handleClick = (e) =>{
        e.preventDefault()
        console.log(res)
        dispatch({type:"REMOVE_DOCUMENT_ID"})
        dispatch({type:"SET_DOCUMENT_ID", payload:res})
        history.push('/notification')
    }
    useEffect(()=>{
        let dayz= count-getMonthDays()
        let cont = place>dayz
        let today= new Date()
        let year= today.getFullYear()
        let month=today.getMonth()
        
        let dt = new Date(year,month,place-dayz )
        if(place-dayz>0){
            setDate(dateToText(dt))
            setDatedt(dt)
        }
       
        if(cont){
            getDay(dt, res=>{
                console.log(res)
                setRes(res.data.date)
                if(res.data.type=="note"){
                    setNotes(true)
                    
                    setNotesDt(notes=>[...notes, {name:res.data.data}])
                }
                    if(res.data.type == 'goal'){
                    setGoals(true)
                    setGoalsDt(goals=>[...goals, {name:res.data.data, completed:res.data.completed}])
                    let condition = !res.data.completed?(setGoalsRed(true)):(null)
                }
                    if(res.data.type == 'reminder'){
                    
                    setReminders(true)
                    setRemindersDt(reminders=>[...reminders, {name:res.data.data, completed:res.data.completed}])
                    let condition = !res.data.completed?setRemindersRed(true):null
                }
                
            })
        }
        
    },[])
    return (
        <div className="day" onClick={e=>{
            handleClick(e)
            }}>
            <div className="top">
            <p>{date}</p>
            </div>
            <div className="icons">
                <div className="iconFa">
                    {goals ?[
                        (goalsRed?(
                            <img className="iconFa-icon" src={bullseyeRed} alt="notes"/>
                        ):(
                            <img className="iconFa-icon" src={bullseye} alt="notes"/>
                        ))    
                    ]:(
                        null
                    )}
                </div>
                <div className="iconFa">
                    {reminders ?[
                        (remindersRed ? (
                            <img className="iconFa-icon" src={reminderRed} alt="notes"/>
                        ): (
                            <img className="iconFa-icon" src={reminder} alt="notes"/>
                        ))
                    ]:(
                            null
                        )}
                </div>
                <div className="iconFa">
                    {notesDt.length ?(
                            <img className="iconFa-icon" src={notesRed} alt="notes"/>
                        ):(
                            null
                        )}
                </div>
            </div>
            <div className="meat">

                <ul>
                    {notesDt.length ? (
                        <li><span styles={{
                            display:'block',
                            textOverflow:'ellipsis',
                            overflow:'hidden'
                        }}>{notesDt[0].name}</span></li>
                    ):(null)}
                    {remindersDt.length ? (
                        <li><span style={{
                            display:'block',
                            textOverflow:'ellipsis',
                            overflow:'hidden'
                            
                        }}>{remindersDt[0].name}</span></li>
                    ):(null)}
                    {goalsDt.length ? (
                        <li><span style={{
                            display:'block',
                            textOverflow:'ellipsis',
                            overflow:'hidden'
                        }}>{goalsDt[0].name}</span></li>
                    ):(null)}
                    
                </ul>
            </div>
        </div>
    )
}

export default DayOla
