import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Notification() {
    const history = useHistory()
    const [notes, setNotes] = useState([])
    const [goals, setGoals] = useState([])
    const [reminders, setReminders] = useState([])
    useEffect(()=>{
        setNotes(['random thought1', 'random thought 2'])
        setGoals(['goal1', 'goal2'])
        setReminders(['reminder1', 'reminder2'])
    },[])
    const add = () =>{
        history.push('/addnew')
    }
    return (
        <div className='notification'>
            <div className="date"></div>
            <div className="notes">
                <h1>Notes</h1>
                <div className="divider">
                    <div className="notez">
                    {notes && notes.map(note => {
                   return ( <div className="note"key={uuidv4()}>
                        <p>{note}</p>
                    </div>)
                })}
                    </div>
                
                <div className="fab">
                <Fab className="Fab" color="primary" aria-label="add">
                    <AddIcon onClick={add} />
                </Fab>
                </div>
                </div>         
            </div>

            <div className="goals">
                <h1>Goals</h1>
                <div className="divider">
                <div className="goalz">
                {goals && goals.map(goal => {
                   return ( <div className="goal" key={uuidv4()}>
                        <input type="checkbox" name="goalCheck" id="goalCheck" />
                <label htmlFor="goal">{goal}</label>
                        
                    </div>)
                })}
                </div>
                
                <div className="fab">
                <Fab className="Fab" color="primary" aria-label="add">
                    <AddIcon onClick={add} />
                </Fab>
                </div>
                </div>
            </div>
            <div className="reminder">
                <h1>reminders</h1>
                <div className="divider">
                    <div className="reminderz">
                    {reminders && reminders.map(reminder => {
                    return (<div className="reminder"key={uuidv4()}>
                        <input type="checkbox" name="reminderCheck" id="reminderCheck" />
                        <label htmlFor="reminder">{reminder}</label>
                        
                    </div>)
                })}
                    </div>
                 <div className="fab">
                <Fab className="Fab" color="primary" aria-label="add">
                    <AddIcon onClick={add} />
                </Fab>
                </div>
                </div>         
            </div>
        </div>
    )
}

export default Notification
