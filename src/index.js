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
    NavBar  
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
    const [myRoutines, setMyRoutines] = useState({});
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
        console.log ("I changed the routines path api", results)
        setRoutines(results) 
    }

    const fetchActivities = async() => {
        const results = await getActivities(token)
        console.log ('activities fetch yields: ', results)
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
        console.log ('usersRoutines: ', usersRoutines)
        if (usersRoutines.id) {
            setMyRoutines(usersRoutines);
        } else {
            console.log("error finding users routines");
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
            <NavBar logout={logout} token={token}/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Routines' element={<Routines routines={routines} token={token} />} />
                <Route path='/Activities' element={<Activities activities={activities} />} />
                <Route path='/MyRoutines' element={<MyRoutines myRoutines={myRoutines}/>} />
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
                {/* <Route path='/CreateNewRoutine' 
                element={<CreateNewRoutine
                token={token} navigate={navigate} 
                // open={open} setOpen={setOpen}
                fetchRoutines={fetchRoutines}/>} />
                <Route path='/CreateNewActivity' 
                element={<CreateNewActivity
                token={token} navigate={navigate} 
                // open={open} setOpen={setOpen}
                fetchActivities={fetchActivities}/>} />
                <Route path ='/routines/:routineId' element={<SingleRoutineView routines={routines} />} />
                <Route path ='/routines/edit-routine/:routineId' element={<EditRoutine routines={routines} token={token} navigate={navigate} fetchRoutines={fetchRoutines}/>} />
                <Route path ='/activities/:activityId' element={<SingleActivityView activities={activities} />} />
                <Route path ='/activities/edit-activity/:activityId' element={<EditActivity activities={activities} token={token} navigate={navigate} fetchActivities={fetchActivities}/>} /> */}
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