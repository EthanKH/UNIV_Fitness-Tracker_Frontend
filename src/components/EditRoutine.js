import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateRoutine, deleteRoutine } from '../api';
import './EditRoutine.css'

const EditRoutine = ({token, navigate, getUsersRoutines, myRoutines}) => {
    const { routineId } = useParams();
    const routines = myRoutines

    const [currentRoutine] =  routines.filter(routine => routine.id === parseInt(routineId)); //this returns array of 1 item
    console.log('currentRoutine is: ', currentRoutine)
    const {name, goal} = currentRoutine;
  

    const [newName, setName] = useState(name);
    const [newGoal, setNewGoal] = useState(goal);
    const [isPublic, setIsPublic] = useState(false);
    const [updatedActivityCount, setUpdatedActivityCount] = useState('')
    const [updatedActivityDuration, setUpdatedActivityDuration] = useState('')
    //code to update count and duration of activity not working, ran out of time

    
    const editRoutine = async() => {
        const results = await updateRoutine(token, routineId, newName, newGoal, isPublic)
        await getUsersRoutines();
        navigate('/MyRoutines') 
    }

    return (
        <main>
        <h1>Edit Routine</h1>
            <form className='EditRoutineForm' onSubmit={(event) => {
                event.preventDefault();
                editRoutine()
            }}>
                <div className="EditRoutineInput">
                    <input
                    type='text'
                    placeholder={newName}
                    onChange={(event)=> {setNewName(event.target.value)}}
                    />
                </div>
                <div className="EditRoutineInput">
                    <input
                    type='text'
                    placeholder={newGoal}
                    onChange={(event)=> {setNewGoal(event.target.value)}}
                    />
                </div>
                <div className='EditRoutineInput'>
                    <h3>Make Public?</h3>
                    <input className="checkBox"
                    type='checkbox'
                    onChange ={event => setIsPublic(true)} >
                    </input>
                </div>
                <div className='editActivitiesForRoutine'>
                {currentRoutine.activities.map (activity => {
                                
                                const {name, description, duration, count, routineActivityId} = activity
                                return (<div key={activity.id} className="activityForMyRoutine">
                                    <h4>{name}</h4>
                                    <p>{description}</p>
                                    <p>{count}</p>
                                    <p>{duration}</p>
                                    <form onSubmit={(event) => {
                                        event.preventDefault();
                                        updateActivityForRoutine(token, routineActivityId, updatedActivityCount, updatedActivityDuration)
                                        getUsersRoutines()
                                    }}>
                                    <span className='activityCount'>
                                        <input
                                        type='text'
                                        placeholder='edit count'
                                        value={updatedActivityCount}
                                        onChange={(event)=> {setUpdatedActivityCount(event.target.value)}}
                                        />
                                    </span>
                                    <span className='activityDuration'>
                                        <input
                                        type='text'
                                        placeholder='edit duration'
                                        value={updatedActivityDuration}
                                        onChange={(event)=> {setUpdatedActivityDuration(event.target.value)}}
                                        />
                                    </span>
                                    <span><button>Update Activity</button></span>
                                    </form>
                                    </div>)})}
            </div>
                
            <button type='submit'>Update Routine</button>
            </form>

          </main>  
        )
}

export default EditRoutine;

