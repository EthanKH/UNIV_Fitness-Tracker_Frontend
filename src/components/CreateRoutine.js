import React, {useState} from "react";
import { createRoutine } from "../api";
import { Snackbar } from "@mui/material";
import './CreateRoutine.css'

const CreateRoutine = ({token, navigate, open, setOpen, getUsersRoutines }) => {
    const [name, setName] = useState('')
    const [goal, setGoal] = useState('')
    const [isPublic, setIsPublic] = useState(false)


    const handleSubmit = async () => {
    const results = await createRoutine(token, name, goal, isPublic);
    
        if (results) {
            getUsersRoutines();
            navigate('/MyRoutines') 
        } else {
            setOpen(true)
            let form = document.querySelector('form')
            form.reset()
        }
    }

    return (
        <main>
            <h1>Create Routine</h1>
            <form className='routineSubmitForm' onSubmit = {(event)=> {
            event.preventDefault();
                handleSubmit()
            }
            }>
            <Snackbar 
                open={open}
                anchorOrigin= {{vertical: "top", horizontal: "center"}}
                message='There was an error uploading your routine, please try again' 
                autoHideDuration={2000} 
                onClose={() => setOpen(false)}
                >
            </Snackbar>
            <div className="newRoutineInput">
                    <h3>Name</h3>
                    <input
                    type='text'
                    placeholder="name"
                    onChange ={event => setName(event.target.value)} >
                    </input>
                </div>
                <div className="newRoutineInput">
                    <h3>Goal</h3>
                    <input
                    type='text'
                    placeholder="goal"
                    onChange ={event => setGoal(event.target.value)} >
                    </input>
                </div>
                
                <div className="newRoutineInput">
                    <h3>Make Public?</h3>
                    <input className="checkBox"
                    type='checkbox'
                    onChange ={event => setIsPublic(true)} >
                    </input>
                </div>
                <div>
                    <button type="submit">Add Routine</button>
                </div>
            </form>           
        </main>
    )
}

export default CreateRoutine;