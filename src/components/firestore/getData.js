import {db} from '../config/firebaseConfig'
export const getAllDays = () =>{
    db.collection('day').get().then(snap=>{
        snap.docs.forEach(doc=>{
            console.log(doc.data().date.toDate())
        })
    }).catch(err=>{
        console.log(err)
    })
}