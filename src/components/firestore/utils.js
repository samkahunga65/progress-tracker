import firebase from 'firebase/app'

export const dateToTimestamp = date =>{
    let day = firebase.firestore.Timestamp.fromDate(date)
    return day
}
export const timestampToDate = timestamp =>{
    let date =  timestamp.toDate()
    return date
}
export const newDayObj = (notes, reminders, goals, date) =>{
    let day = dateToTimestamp(date)
    let defObj = {
        date:day,
        goals:{},
        notes:{},
        reminders:{}
    }
    if(notes){
        defObj.notes = notes
    }else if(reminders){
        defObj.reminders[Object.keys(reminders)[0]]=Object.values(reminders)[0]
    }else if(goals){
        defObj.goals[Object.keys(goals)[0]]=Object.values(goals)[0]
    }
    return defObj
}
export const dateToText = (date) =>{
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let anc = `${day}/${month}`
    return anc
}
export function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }