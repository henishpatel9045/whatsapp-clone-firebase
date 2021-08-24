import { Button } from '@material-ui/core'
import React from 'react'
import "./login.css"
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

export default function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = ()=>{
        auth
          .signInWithPopup(provider)
          .then((result)=>{
              dispatch({
                  type: actionTypes.SET_USER,
                  user: result.user,
              })
          })
          .catch((error)=>{alert(error.message)});

    }

    return (
        <div className="login">
            <div className="login__container">
                <div className="img"></div>
                <h2>Sign in to What'sApp</h2>
                <h3>Sign in using Google</h3>
                <Button onClick={signIn}>
                    SignIn
                </Button>
            </div>
        </div>
    )
}
