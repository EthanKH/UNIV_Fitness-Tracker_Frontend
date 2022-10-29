import React from 'react';
import './Login.css';
import { loginUser, getMe, getMyRoutines } from "../api";
import { Snackbar } from "@mui/material";

const Login = ({setUsername, username, setPassword, password, navigate, setToken, setMyRoutines, setOpen, open, token}) => {

    const handleSubmit = async () => {
        const results = await loginUser(username, password);
        console.log('results submitting user: ', results)

        
        if (results.token) {
            setToken(results.token)
            window.localStorage.setItem('token', results.token) 
            const userResults = await getMe(results.token)
            console.log ('token is: ', results.token, 'user is: ', userResults.username)
            setMyRoutines(await getMyRoutines(results.token, username))
            navigate('/myRoutines') 
        } else {
            setOpen(true)
            let form = document.querySelector('form')
            form.reset()
        }
    }
    
    return (
        <form onSubmit = {(event)=> {
            event.preventDefault();
                handleSubmit()
            }
        }>
            <Snackbar 
                open={open}
                anchorOrigin= {{vertical: "top", horizontal: "center"}}
                message='Username or Password is incorrect, please try again' 
                autoHideDuration={2000} 
                onClose={() => setOpen(false)}
                >
            </Snackbar>
            <div className="loginForm">
            <input className="usernameEntry"
            type='text'
            placeholder="Enter Username"
            onChange={(event) => setUsername(event.target.value)}>
            </input>
            <input className="passwordEntry"
            type='password'
            placeholder="Enter Password"
            onChange={(event) => setPassword(event.target.value) }>
            </input>


            <button type='submit'>Submit</button>
            </div>
        </form>
    )
}


export default Login;
