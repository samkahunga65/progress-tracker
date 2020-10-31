import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { auth } from './config/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
    const [loggedIn , setLoggedIn] = useState(null)
    const history = useHistory()
    // let location = useLocation()
    // const auth = () =>{
    //     if(location.pathname==='/'){
    //         history.push('/auth')
    //     }else{
    //         history.push('/')
    //     }
        
    // }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const signIn = (e)=>{
      e.preventDefault()
      history.push('/auth')
  }
  const logout = (e) =>{
    e.preventDefault()
      auth.signOut()
      history.push('/auth')
  }
  const authListener = () =>{
    auth.onAuthStateChanged((user)=>{
        if(user){
            setLoggedIn(user)
        }
    })
}
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    authListener()
  }, [])

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <FontAwesomeIcon icon={faUser}/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {loggedIn ? (
              <div className="menu">
                  <MenuItem onClick={e=>{
                      handleClose(e)
                      logout(e)
                  }}>Logout</MenuItem>
              </div>
              
          )
        :
        (
            <div className="menu">
            <MenuItem onClick={e=>{
                handleClose(e)
                signIn(e)
            }}>sign in</MenuItem>
            </div>
        )}

        
      </Menu>
    </div>
  );
}