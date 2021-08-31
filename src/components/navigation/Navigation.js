import React from 'react'

function Navigation({onRouteChange,isSignedIn}) {

    if(isSignedIn){
    return (
        <nav>
            <p 
            onClick = {() => onRouteChange('signout')}
            className = "font-style f3 link dim black underline pa3 pointer "
                style = {{display: 'flex', justifyContent: 'flex-end'}}>
                SignOut
            </p>
        </nav>
    )
    } else {
        return (
            <nav>
                <p 
                onClick = {() => onRouteChange('signin')}
                className = "font-style f3 link dim black underline pa3 pointer "
                    style = {{display: 'flex', justifyContent: 'flex-end'}}>
                    SignIn
                </p>
                <p 
                onClick = {() => onRouteChange('register')}
                className = "font-style f3 link dim black underline pa3 pointer "
                    style = {{display: 'flex', justifyContent: 'flex-end'}}>
                    Register
                </p>
            </nav>
        )
    }
}

export default Navigation
