import React from 'react';
import { registerUser, getMyRoutines } from "../api";
import { Snackbar } from "@mui/material";
import './Register.css';

const Register = ({ setToken, navigate, setUsername, username, setPassword, password, setMyRoutines, setOpen, open, }) => {


    const handleSubmit = async () => {
        const passwordRequirements = new RegExp ("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$")

        if ((password.length >= 6) && (passwordRequirements.test(password))) {
            
            const results = await registerUser(username, password);
            console.log('register results: ', results)
            console.log('password is: ', password, 'user is: ', username)
            
            if (results.token) {
                setToken(results.token)
                window.localStorage.setItem('token', results.token) 
                const userResults = await getMyRoutines(results.token, username)
                let usersRoutines = userResults.data
                setMyRoutines(usersRoutines)
                navigate('/MyRoutines')
            } else {
                console.log("error registering user")
            }
        } else {
            let form = document.querySelector("form")
            setOpen(true)
            form.reset()
            setUsername('')
            setPassword('') 

        }
    }


    return (
        <form onSubmit = {(event)=> {
            event.preventDefault()
                handleSubmit()
            }
            }>
            <Snackbar 
                open={open}
                anchorOrigin= {{vertical: "top", horizontal: "center"}}
                message='Password does not meet requirements, please try again' 
                autoHideDuration={2000} 
                onClose={() => setOpen(false)}
                >
            </Snackbar>
            <div className="registerForm">
            <input className="setUsernameEntry"
            type='text'
            placeholder="Enter Username"
            onChange={(event) => setUsername(event.target.value)}>
            </input>
            <input className="setPasswordEntry"
            //make type password to use dots when entered
            type='password'
            placeholder="Enter Password"
            onChange={(event) => setPassword(event.target.value) }>
            </input>
            <h4>Password Requirements:</h4>
            <ul className="passwordRulesList">
                <li className="passwordRule">Must be at least 6 characters in length</li>
                <li className="passwordRule">Must contain a capitol letter</li>
                <li className="passwordRule">Must contain a lowercase letter</li>
                <li className="passwordRule">Must include a number</li>
                <li className="passwordRule">Must include a special character</li>
            </ul>

            <button type='submit'>Submit</button>
            </div>
        </form>
    )
}


export default Register;
