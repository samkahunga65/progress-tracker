import React, { useEffect } from 'react'
import bullseyeRed from './svgs/bullseye-with-arrow.svg'
import bullseye from './svgs/bullseye-with-arrow red.svg'
import notes from './svgs/post-it.svg'
import notesRed from './svgs/post-it (1).svg'
import reminder from './svgs/clock.svg'
import reminderRed from './svgs/clock (1).svg'
import { dateToText } from './firestore/utils'
function ReadProps({day, funcs}) {
    const newDay = day
    if(!newDay.hasOwnProperty('data')){
        console.log("fixing new Data"+day.date)
        newDay.data = {
            date:'',
            reminders:[],
            goals:[],
            notes:[]
        }
    }
    let date1 = dateToText(day.date)
    return (
        <div className="day" onClick={funcs}>
                    <div className="top">
                        {newDay.hasOwnProperty('noDay')? (
                            null
                        ):(
                            <p>{date1}</p>
                        )}
                        
                    </div>
                    <div className="icons">
                        <div className="iconFa">
                            {newDay.data.notes.length?(
                                <img className="iconFa-icon" src={notesRed} alt="notes"/>
                            ) :(
                                console.log(day.data.notes)
                               
                            )}
                        
                        </div>
                        <div className="iconFa">
                        {newDay.data.goals.length?(
                                <img className="iconFa-icon" src={bullseyeRed} alt="notes"/>
                            ) : (
                               null
                            )}
                        {/* <img className="iconFa-icon" src={bullseye} alt="goals"/> */}
                        </div>
                        <div className="iconFa">
                        {newDay.data.reminders.length?(
                                <img className="iconFa-icon" src={reminderRed} alt="notes"/>
                            ) : (
                               null
                            )}
                     
                        </div>
                    </div>
                    <div className="meat">
                    </div>
                </div>
    )
}

export default ReadProps
