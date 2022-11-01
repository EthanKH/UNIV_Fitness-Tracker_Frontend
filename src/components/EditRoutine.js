import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateRoutine ,updateActivityForRoutine } from '../api';
import './EditRoutine.css'

const EditRoutine = ({token, navigate, getUsersRoutines, myRoutines}) => {
    const { routineId } = useParams();
    const routines = myRoutines
    const [currentRoutine] =  routines.filter(routine => routine.id === parseInt(routineId)); //this returns array of 1 item

    const {name, goal} = currentRoutine;
  

    const [newName, setNewName] = useState(name);
    const [newGoal, setNewGoal] = useState(goal);
    const [isPublic, setIsPublic] = useState(false);

    //code to update count and duration of activity not working, ran out of time

    
    const editRoutine = async() => {
        await updateRoutine(token, routineId, newName, newGoal, isPublic)
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
            </div>
                
            <button type='submit'>Update Routine</button>
            </form>

          </main>  
        )
}

export default EditRoutine;

