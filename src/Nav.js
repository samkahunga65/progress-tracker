import React, { useEffect, useState } from 'react'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars, faBell } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useLocation } from 'react-router-dom';
import Menu from './components/MaterialMenu'
function Nav() {
    const history = useHistory()
    let location = useLocation()
    let [back, setBack] = useState(null)
    const auth = () =>{
        if(location.pathname==='/'){
            history.push('/auth')
        }else{
            history.push('/')
        }
        
    }
    const goBack = e =>{
        e.preventDefault()
        history.goBack()
    }
    useEffect(()=>{
        if(location.pathname === '/' || location.pathname === '/auth'){
            setBack(back=>null)
        }else{
            setBack(back=>true)
        }
    },[location])
    return (
        <div className="navbar" style={{
            display:"flex",
            justifyContent:"space-between",
            backgroundColor:"#4BC0D9",
            height:"60px"
        }}>
          <div className="drawer">
              {back ? (
                  <FontAwesomeIcon
                  onClick={goBack} icon={faArrowLeft} size="1x"/>
              )
            :
            (
                <FontAwesomeIcon
                
                icon={faBars} size="1x"/>
            )}
              
          </div>
          <div className="user" style={{
              width:"90px",
              display:"flex",
              justifyContent:"space-between"
          }}>
              <div className="notifications">
              <FontAwesomeIcon icon={faBell}/>
              </div>
                <div className="auth">
                    <Menu/>                
                    </div>
          
          </div>
        </div>
    )
}

export default Nav
