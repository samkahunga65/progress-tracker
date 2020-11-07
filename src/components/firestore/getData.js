import {db, auth} from '../config/firebaseConfig'
import {dateToTimestamp, newDayObj, timestampToDate} from './utils'
import firebase from 'firebase/app'
import swal from 'sweetalert'
import {getMonthDays} from '../data/generator'

var uuid = 'holder'
export var dayRef = db.collection(uuid)
export const setuid = (data)=>{
    console.log(typeof data)
    uuid = `${data}`
    dayRef = db.collection(uuid)
  }


export const getAllDays = () =>{
    dayRef.get().then(snap=>{
        snap.docs.forEach(doc=>{
            let date = timestampToDate(doc.data().date)
            console.log(date)
        })
    }).catch(err=>{
        console.log(err)
    })
}

export const getDay = (day, callback) =>{
    console.log(typeof uuid)
    let date = dateToTimestamp(day)
    dayRef
    .where('date', '==', date)
    .get()
    .then(snap=>{
        snap.forEach(doc=>{
            callback ({data:doc.data(), id:doc.id})
        })
    })
    .catch(err=>{
        console.log(err)
        callback (err)
    })
} 

export const addNote = (day, note, callback) =>{
    let date = dateToTimestamp(day)
    let data = {date, type:'note', data:note}
    dayRef
    .doc()
    .set(data)
    .then(res=>{
        callback(res)
    })
    .catch(err=>{
        callback(err)
    })
}

export const addGoal = (day, goal, callback) =>{
    let date = dateToTimestamp(day)
    let data = {date, type:'goal', data:goal, completed:false}
    dayRef
    .doc()
    .set(data)
    .then(res=>{
        callback(res)
    })
    .catch(err=>{
        callback(err)
    })
}

export const addReminder = (day, reminder, callback) =>{
    let date = dateToTimestamp(day)
    let data = {date, type:'reminder', data:reminder, completed:false}
    dayRef
    .doc()
    .set(data)
    .then(res=>{
        callback(res)
    })
    .catch(err=>{
        callback(err)
    })
}

export const removeGoal = (day, goal, callback) =>{
    let date = dateToTimestamp(day)
    dayRef
    .where('date', '==', date)
    .where('data',"==",goal)
    .get()
    .then(snap=>{
        if(!snap.empty){
            snap.forEach(docu=>{
                dayRef
                .doc(docu.id)
                .delete()
                .then(res=>{
                    callback(res)
                })
                .catch(err=>{
                    alert('error when removing your goal')
                })
            })
        }
    })
    .catch(err=>{
        callback(err)
    })
}

export const removeReminder = (day, reminder, callback) =>{
    let date = dateToTimestamp(day)
    dayRef
    .where('date', '==', date)
    .where('data',"==",reminder)
    .get()
    .then(snap=>{
        if(!snap.empty){
            snap.forEach(docu=>{
                dayRef
                .doc(docu.id)
                .delete()
                .then(res=>{
                    callback(res)
                })
                .catch(err=>{
                    alert('error when removing your reminder')
                })
            })
        }
    })
    .catch(err=>{
        callback(err)
    })
}

export const removeNote = (day, note, callback) =>{
    let date = dateToTimestamp(day)
    dayRef
    .where('date', '==', date)
    .where('data',"==",note)
    .get()
    .then(snap=>{
        if(!snap.empty){
            snap.forEach(docu=>{
                dayRef
                .doc(docu.id)
                .delete()
                .then(res=>{
                    callback(res)
                })
                .catch(err=>{
                    alert('error when removing your notes')
                })
            })
        }
    })
    .catch(err=>{
        callback(err)
    })
}

export const doGoal = (day, goal,state) =>{
    let date = dateToTimestamp(day)
    dayRef
    .where('date', '==', date)
    .where('data','==',goal)
    .get()
    .then(snap=>{
        if(!snap.empty){
            snap.forEach(docu=>{
                dayRef
                .doc(docu.id)
                .update({
                    completed:state
                })
            })
        }
    })
}

export const doReminder = (day, reminder, state) =>{
    let date = dateToTimestamp(day)
    dayRef
    .where('date', '==', date)
    .where('data','==',reminder)
    .get()
    .then(snap=>{
        if(!snap.empty){
            snap.forEach(docu=>{
                dayRef
                .doc(docu.id)
                .update({
                    completed:state
                })
            })
        }
    })
}
export const monthData = () =>{
    const data = []
    const today = new Date()
    const thisMonth = today.getMonth()
    const thisDate = today.getDate()
    const thisFullYear = today.getFullYear()
    let days = getMonthDays()
    for (let i = 0; i < days; i++) {
        data.push({date:new Date(thisFullYear, thisMonth,i+1)})
    }
    data.forEach(day=>{
        getDay(day.date, res=>{
            day.data = res
        })
    })
    return data
}