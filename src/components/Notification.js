import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { v4 as uuidv4 } from 'uuid';
import { CTX } from '../store';
import { dayRef } from './firestore/getData';
import { doGoal, doReminder,addNote,addReminder,addGoal,getDay } from './firestore/getData';


function Notification() {
    const history = useHistory()
    const [notes, setNotes] = useState([])
    const [goals, setGoals] = useState([])
    const [id, setId] = useState()
    const [change, setChange] = useState(0)
    const [reminders, setReminders] = useState([])
    const [state, dispatch] = useContext(CTX);
    const changeGoal=(e)=>{
        console.log(e.target.checked, e.target.name)
        doGoal(state.document.toDate(), e.target.name, e.target.checked)
    }
    const changeReminder=(e)=>{
        e.preventDefault()
        console.log(e.target.checked, e.target.name)
        doReminder(state.document.toDate(), e.target.name, e.target.checked)
    }
    useEffect(()=>{
    },[])
    useEffect(()=>{
        if(state.document){
            console.log(state.document)
            dayRef
            .where("date",'==',state.document)
            .get()
            .then(snap=>{
                setNotes([])
                setReminders([])
                setGoals([])
                snap.forEach(docu=>{
                    if(docu.data().type === 'note'){
                        setNotes(notes=>[...notes, docu.data().data])
                    }
                    if(docu.data().type === 'reminder'){
                        setReminders(reminders=>[...reminders, {name:docu.data().data, completed:docu.data().completed}])
                    }
                    if(docu.data().type === 'goal'){
                        setGoals(goals=>[...goals, {name:docu.data().data, completed:docu.data().completed}])
                    }
                })
            })
            .catch(err=>{
                alert('error when getting days data')
            })
        }
    },[state.document])
    useEffect(()=>{
        if (change){
            dayRef
            .where("date",'==',state.document)
            .get()
            .then(snap=>{
                setNotes([])
                setReminders([])
                setGoals([])
                snap.forEach(docu=>{
                   
                    if(docu.data().type === 'note'){
                        setNotes(notes=>[...notes, docu.data().data])
                    }
                    if(docu.data().type === 'reminder'){
                        setReminders(reminders=>[...reminders, {name:docu.data().data, completed:docu.data().completed}])
                    }
                    if(docu.data().type === 'goal'){
                        setGoals(goals=>[...goals, {name:docu.data().data, completed:docu.data().completed}])
                    }
                })
            })
            .catch(err=>{
                alert('error when getting days data')
            })
        } 
    }, [change])
    const add = (type,e) =>{
        e.preventDefault()
        swal(
            {
                text: `add ${type}`,
                content: "input",
                button: {
                  text: "add",
                  closeModal: false,
                },
              }
        )
        .then(input=>{
            if (!input) throw null;
            switch(type){
                case 'note':
                    addNote(state.document.toDate(),input, res=>{
                        console.log(res)
                    })
                    setChange(change+1)
                    swal("Thank you for adding notes")
                    break
                case 'goal':
                    addGoal(state.document.toDate(),input,res=>{
                        console.log(res)
                    })
                    setChange(change+1)
                    swal("Thank you for adding a goal")
                    break
                case 'reminder':
                    addReminder(state.document.toDate(),input,res=>{
                        console.log(res)
                    })
                    setChange(change+1)
                    swal("Thank you for adding a reminder")
                    break
                default:
                    swal('something went wrong, Please try again')
                    break
            }
        })
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
                    <AddIcon onClick={e=>{
                        add('note', e)
                    }} />
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
                           <input type="checkbox" name={goal.name} 
                           onChange={changeGoal}
                           defaultChecked={goal.completed}
                           id="goalCheck" />
                <label htmlFor="goal">{goal.name}</label>
                        
                    </div>)
                })}
                </div>
                
                <div className="fab">
                <Fab className="Fab" color="primary" aria-label="add">
                    <AddIcon onClick={e=>{
                        add('goal', e)
                    }} />
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
                            <input type="checkbox" name={reminder.name} 
                            onChange={changeReminder}
                            defaultChecked={reminder.completed}
                            id="reminderCheck" />
                        
                        <label htmlFor="reminder">{reminder.name}</label>
                        
                    </div>)
                })}
                    </div>
                 <div className="fab">
                <Fab className="Fab" color="primary" aria-label="add">
                    <AddIcon onClick={e=>{
                        add('reminder', e)
                    }} />
                </Fab>
                </div>
                </div>         
            </div>
        </div>
    )
}

export default Notification
