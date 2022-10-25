import React from 'react';
import './Login.css';
import { loginUser, getMe } from "../api";
import { Snackbar } from "@mui/material";

const Login = ({setUsername, username, setPassword, password, navigate, setToken, setMyRoutines, setOpen, open}) => {

    const handleSubmit = async () => {
        const results = await loginUser(username, password);
        
        if (results.success) {
            setToken(results.data.token)
            window.localStorage.setItem('token', results.data.token) 
            const userResults = await getMe(results.data.token)
            let me = userResults.data
            setMyRoutines(me)
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
        </form>
    )
}


export default Login;
