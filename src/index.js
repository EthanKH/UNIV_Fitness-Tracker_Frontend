import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import {
    Route, BrowserRouter, Routes, useNavigate
} from 'react-router-dom'
import './style.css';
import {
    Activities,
    Home,
    Register,
    Login,
    MyRoutines,
    Routines,  
    NavBar,  
    EditActivity,
    CreateNewActivity,
    CreateRoutine,
    EditRoutine
}  from './components';
import {
    getActivities,
    getMyRoutines,
    getRoutines,
    getMe
} from './api'

const App = () => {
    const [ token, setToken ] = useState('');
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [myRoutines, setMyRoutines] = useState([]);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem('token');
        setToken('') 
        setMyRoutines({});
    }


    const fetchRoutines = async() => {
        const results = await getRoutines(token)
        setRoutines(results) 
    }

    const fetchActivities = async() => {
        const results = await getActivities(token)
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
        const user = await getMe(token)
        setUser(user)
        const usersRoutines = await getMyRoutines(token, user.username)
        if (usersRoutines) {
            setMyRoutines(usersRoutines);
        } else {
            console.log("error finding users routines");
        }
    }
   

   

    useEffect (() => {
        fetchActivities()
        getUsersRoutines();
        fetchRoutines()
    },[token])

  

    return (
        <div>
            <NavBar logout={logout} token={token}/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Routines' element={<Routines routines={routines} token={token} />} />
                <Route path='/Activities' element={<Activities activities={activities} />} />
                <Route path='/MyRoutines' element={<MyRoutines myRoutines={myRoutines} token={token} activities={activities} getUsersRoutines={getUsersRoutines}/>} />
                <Route path='/Register' element={<Register 
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
                <Route path='/Login' element={<Login 
                    open={open} 
                    setOpen={setOpen} 
                    setMyRoutines={setMyRoutines} 
                    setToken={setToken} 
                    token={token}
                    setUsername={setUsername} 
                    username={username} 
                    setPassword={setPassword} 
                    password={password} 
                    navigate={navigate}/>} 
                />
                <Route path='/CreateRoutine' 
                element={<CreateRoutine
                token={token} navigate={navigate} 
                getUsersRoutines={getUsersRoutines} activities={activities}/>} />
                <Route path ='/EditRoutine/:routineId' element={<EditRoutine token={token} navigate={navigate} myRoutines={myRoutines} getUsersRoutines={getUsersRoutines}/>} />
                <Route path='/EditActivity/:activityID' element={<EditActivity fetchActivities={fetchActivities} activities={activities} navigate={navigate}/>}/>
                <Route path='/CreateNewActivity' element={<CreateNewActivity activities={activities} navigate={navigate} fetchActivities={fetchActivities} token={token}/>} />
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