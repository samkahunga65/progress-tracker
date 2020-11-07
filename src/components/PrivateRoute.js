import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { auth } from './config/firebaseConfig'
function PrivateRoute({component:Component, ...rest}) {
    return (
        <Route
        {...rest}
        render={
            props=>auth.currentUser ? (
                <Component {...props}/>
            ) : (
                <Redirect
                to={{
                    pathname: '/auth',
                    state: {from:props.location}
                }}
                />
            )
        }
        />
    )
}

export default PrivateRoute
