import React, { Fragment,useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoutines } from '../api';
import './Routines.css';





const Routines = ({ routines }) => {
    const [searchTerm, setSearchTerm] = useState('')


    const routineMatches = (routine, string) => {
        const {name, goal} = routine;
        
        if (name.toLowerCase().includes(string.toLowerCase()) || goal.toLowerCase().includes(string.toLowerCase())) {
            return routine
        }
        }

      const filteredRoutines = routines.filter(routine => routineMatches(routine, searchTerm));
      const routinesToDisplay = searchTerm.length ? filteredRoutines : routines
    
    

    return (
        <main>
            <div className="routineAndSearch">
                <h1 className='routineHeader'>ROUTINES</h1>
                <form className="RoutinesList" onSubmit = {(event)=> {
                    event.preventDefault();    
                    }
                    }>
                    <input className='routinesSearchBar'
                    type='text'
                    placeholder="search"
                    onChange = {(event) => setSearchTerm(event.target.value)}
                    ></input>
                </form>
            </div>
            <div className="routinesContainer">
           {routinesToDisplay.map((routine) => {
               const {creatorName, name, goal, isPublic} = routine;
               if (isPublic) {
             return (
                 <div class='routineCard' key={routine.id} >
                    <h3>{creatorName}</h3>
                    <p>Routine Name: {name}</p>
                    <p>goal: {goal}</p>
                </div>
                )
               }
            })  
           } 
        </div>
          </main> 
    )
}

    
    

    

export default Routines;