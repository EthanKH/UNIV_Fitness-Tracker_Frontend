import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateRoutine, deleteRoutine } from '../api';

const EditRoutine = ({routines, token, navigate, getUsersRoutines}) => {
    const { routineId } = useParams();

    const [currentRoutine] =  routines.filter(routine => routine.id === parseInt(routineId)); //this returns array of 1 item
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
        <form onSubmit={(event) => {
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
            <h3>Make Public?</h3>
            <input className="checkBox"
            type='checkbox'
            onChange ={event => setIsPublic(true)} >
            </input>
            
        <button type='submit'>Update Routine</button>
        </form>
        )
}

export default EditRoutine;