import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import {
    Route, BrowserRouter, Routes, useNavigate
} from 'react-router-dom'
import './style.css';
import {
    activities,
    home,
    register,
    login,
    myRoutines,
    routines,    
}  from './components';
import {
    getActivities,
    getMyRoutines,
    getRoutines
} from './api'

const App = () => {
    const [ token, setToken ] = useState('');
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [myRoutines, setMyRoutines] = useState({});
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem('token');
        setToken('') 
        setMyRoutines({});
    }


    const fetchRoutines = async() => {
        const results = await getRoutines(token)
        console.log (results)
        setRoutines(results) //this route may be incorrect, routines may be called something else
    }

    const fetchActivities = async() => {
        const results = await getActivities(token)
        console.log (results)
        setActivities(results) //this route may be incorrect, routines may be called something else
    }

    
    const getUsersRoutines = async() => {
        const storedToken = window.localStorage.getItem('token')

        if (!token) {
            if (storedToken) {
            setToken(storedToken);
            }
            return
        }
        const usersRoutines = await getMyRoutines(token)
        if (usersRoutines.success) {
            setMyRoutines(usersRoutines.data);
        } else {
            console.log(usersRoutines.error.message);
        }
    }
   

    useEffect (() => {
        fetchRoutines()
    },[token])

    useEffect (() => {
        fetchActivities()
    },[token])

    useEffect ( () => {
        getUsersRoutines();
    }, [token])

    return (
        <div>
            <Navbar logout={logout} token={token}/>
            <Routes>
                <Route path='/' element={<home />} />
                <Route path='/routines' element={<routines routines={routines} token={token} />} />
                <Route path='/activities' element={<activities activities={activities} token={token} />} />
                <Route path='/myRoutines' element={<myRoutines myRoutines={myRoutines}/>} />
                <Route path='/register' element={<register 
                    open={open} 
                    setOpen={setOpen} 
                    setMyRoutines={setMyRoutines} 
                    setToken={setToken} 
                    setUsername={setUsername} 
                    username={username} 
                    setPassword={setPassword} 
                    password={password} 
                    navigate={navigate}/>} 
                />
                <Route path='/login' element={<login 
                    open={open} 
                    setOpen={setOpen} 
                    setMyRoutines={setMyRoutines} 
                    setToken={setToken} 
                    setUsername={setUsername} 
                    username={username} 
                    setPassword={setPassword} 
                    password={password} 
                    navigate={navigate}/>} 
                />
                <Route path='/createNewRoutine' 
                element={<createNewRoutine
                token={token} navigate={navigate} 
                open={open} setOpen={setOpen}
                fetchRoutines={fetchRoutines}/>} />
                <Route path='/createNewActivity' 
                element={<createNewActivity
                token={token} navigate={navigate} 
                open={open} setOpen={setOpen}
                fetchActivities={fetchActivities}/>} />
                <Route path ='/routines/:routineId' element={<singleRoutineView routines={routines} />} />
                <Route path ='/routines/edit-routine/:routineId' element={<editRoutine routines={routines} token={token} navigate={navigate} fetchRoutines={fetchRoutines}/>} />
                <Route path ='/activities/:activityId' element={<singleActivityView activities={activities} />} />
                <Route path ='/activities/edit-activity/:activityId' element={<editActivity activities={activities} token={token} navigate={navigate} fetchActivities={fetchActivities}/>} />
           </Routes>
            
        </div>
    )
}


const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);