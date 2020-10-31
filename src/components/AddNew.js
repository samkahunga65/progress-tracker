import React, { useState } from 'react'
import swal from 'sweetalert'

function AddNew() {
    const [text, setText] = useState('')
    const [date, setDate] = useState(null)
    const submitForm = e =>{
        e.preventDefault()
        swal(`text : ${text} , date : ${date}`)
    }
    const name = "name"
    return (
        <div className="addNew">
            <h1>{`Add new ${name}`}</h1>
            <form action="#">
                <label htmlFor="text">text</label>
                <input type="text"
                onChange={e=>setText(e.target.value)}
                name=""/>
                <label htmlFor="date">date</label>
                <input type="date"
                onChange={e=>{
                    setDate(e.target.value)}}
                name="date" id="date"/>
                <button onClick={submitForm}>add</button>
            </form>
        </div>
    )
}

export default AddNew
