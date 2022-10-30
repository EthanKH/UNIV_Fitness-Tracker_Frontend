import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateRoutine, deleteRoutine } from '../api';

const EditRoutine = ({token, navigate, getUsersRoutines, myRoutines}) => {
    const { routineId } = useParams();
    const routines = myRoutines

    const [currentRoutine] =  routines.filter(routine => routine.id === parseInt(routineId)); //this returns array of 1 item
    console.log('currentRoutine is: ', currentRoutine)
    const {name, goal} = currentRoutine;

    const [newName, setName] = useState(name);
    const [newGoal, setNewGoal] = useState(goal);
    const [isPublic, setIsPublic] = useState(false);
    
    const editRoutine = async() => {
        const results = await updateRoutine(token, routineId, newName, newGoal, isPublic)
        await getUsersRoutines();
        navigate('/MyRoutines') 
    }

    return (
        <form className='EditRoutineForm' onSubmit={(event) => {
            event.preventDefault();
            editRoutine()
        }}>
            <input
            type='text'
            placeholder={newName}
            onChange={(event)=> {setNewName(event.target.value)}}
            />
            <input
            type='text'
            placeholder={newGoal}
            onChange={(event)=> {setNewGoal(event.target.value)}}
            />
            <div className='publicEdit'>
                <h3>Make Public?</h3>
                <input className="checkBox"
                type='checkbox'
                onChange ={event => setIsPublic(true)} >
                </input>
            </div>
            
        <button type='submit'>Update Routine</button>
        </form>
        )
}

export default EditRoutine;