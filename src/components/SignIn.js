import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import {auth} from './config/firebaseConfig'
import firebase from 'firebase/app'
import { setuid } from './firestore/getData'
// import swal from 'sweetalert';

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [mode, setMode] = useState('in')
    const usernameref = useRef()
    const passref = useRef()
    const pass2ref = useRef()
    const history = useHistory()
    const reset = () =>{
        setEmail('')
        setPassword('')
        setPassword2('')
        usernameref.current.value=''
        passref.current.value=''
        if(pass2ref.current){
            pass2ref.current.value=''
        }
    }
    const authListener = () =>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                reset()
                setUser(user)
                swal('you are logged in')
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        setuid(auth.currentUser.uid)
                    }
                  });
                
                history.push('/')
            }
        })
    }
    const signIn = (e) =>{
        e.preventDefault()
        auth
        .signInWithEmailAndPassword(email, password)
        .catch(err=>{
            setError(err.message)
            alert(err.message)
            reset()
        })
    }
    const handleLogout = () =>{
        auth.signOut()
    }
    const signUp = (e) =>{
        e.preventDefault()
        if(password === password2){
            alert(`username: ${email}, password : ${password}`)
            auth
            .createUserWithEmailAndPassword(email, password)
            .catch(err=>{
                setError(err.message)
                alert(err.message)
                reset()
            })
        }else{
            alert('passwords do not match')
            reset()
        }

       
    }
    const signUpPls = e =>{
        e.preventDefault()
        reset()
        setMode('out')
    }
    const signInPls = e =>{
        e.preventDefault()
        reset()
        setMode('in')
    }
    useEffect(()=>{
        authListener()
    }, [])
    return (
        <div className='signin'>
            {mode && mode === 'in' ? (
                <form action="." className="box">
                    <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input type="text"  name='username' 
                onChange={e=>setEmail(e.target.value)}
                ref={usernameref}/>
                <label htmlFor="password">password</label>
                <input type="password" 
                onChange={e=>setPassword(e.target.value)}
                name="password"
                ref={passref}/>
                <button onClick={signIn}>login</button>
                <p>Dont have an account? <a href="#" onClick={signUpPls}>Sign Up</a></p>
                </form>
            ) 
        :
            (
                <form action="." className='box'>
                    <h1>Sign Up</h1>
                <label htmlFor="username">Username</label>
                <input type="text" name='username' 
                onChange={e=>setEmail(e.target.value)}
                ref={usernameref}/>
                <label htmlFor="password">password</label>
                <input type="password" 
                onChange={e=>setPassword(e.target.value)}
                name="password"
                ref={passref}/>
                <label htmlFor="password">repeat password</label>
                <input type="password" 
                onChange={e=>setPassword2(e.target.value)}
                name="password2"
                ref={pass2ref}/>
                <button onClick={signUp}>sign up</button>
                <p>Already have an account? <a href="#" onClick={signInPls}>Sign in</a></p>
                </form>
            )}
            
        </div>
    )
}

export default SignIn
