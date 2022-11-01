import { duration } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateActivityForRoutine } from '../api';
import './EditActivityForRoutine.css'

const EditActivityForRoutine = ({token, navigate, getUsersRoutines, myRoutines}) => {
    const { routineId, routineActivityId } = useParams();
    const routines = myRoutines
    const [currentRoutine] =  routines.filter(routine => routine.id === parseInt(routineId))
    const [currentActivity] = currentRoutine.activities.filter(activity => activity.routineActivityId === parseInt(routineActivityId))
    const {name, description, count, duration} = currentActivity;
  

    const [newCount, setNewCount] = useState(count);
    const [newDuration, setNewDuration] = useState(duration);
    


    
    const editActivityForRoutine = async() => {
        await updateActivityForRoutine(token, routineActivityId, newCount, newDuration)
        await getUsersRoutines();
        navigate('/MyRoutines') 
    }

    return (
        <main>
        <h1>Edit Activity For Routine</h1>
        <h3>{name} : {description}</h3>
        <form className='EditActivityForRoutineForm' onSubmit={(event) => {
            event.preventDefault();
            editActivityForRoutine()
        }}>
            <div className="EditActivityForRoutineInput">
                <span>Count:</span>
                <input
                type='text'
                placeholder={newCount}
                onChange={(event)=> {setNewCount(event.target.value)}}
                />
            </div>
            <div className="EditActivityForRoutineInput">
            <span>Duration:</span>
                <input
                type='text'
                placeholder={newDuration}
                onChange={(event)=> {setNewDuration(event.target.value)}}
                />
            </div>
            
        <button type='submit'>Update Routine</button>
        </form>

          </main>  
        )
}

export default EditActivityForRoutine;