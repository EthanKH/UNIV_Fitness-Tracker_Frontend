import React, { Fragment,useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoutines } from '../api';
import './routines.css';





const Routines = ({ routines }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // function RoutineMatches(routine, string) {
    //     const{ title, description} = routines;
    
    //     if (title.toLowerCase().includes(string.toLowerCase()) || description.toLowerCase().includes(string.toLowerCase())) {
    //         return routine;
    //     }
    //   // return true if any of the fields you want to check against include the text
    //   // strings have an .includes() method 
    // }
    
    // const filteredRoutines = routines.filter(routine => RoutineMatches(routine, searchTerm));
    // const RoutinesToDisplay = searchTerm.length ? filteredRoutines : routines;
    
    

    return (
        <div>
        
      {/* <div>
            <form onSubmit={(event) => {
                event.preventDefault();
            }}> 
              <input
               type = 'text'
               placeholder = 'Search'
               onChange = {(event) => setSearchTerm(event.target.value)}
              ></input>
              <button type='Search'>Search</button>
             </form>
            </div>
        
        <div class="posts">  */}
        {
           routines.map((routine) => {
               const {creatorName, name, goal, isPublic} = routine;
             return (
                 <div class='card' key={routine.id} >
             <h3>{creatorName}</h3>
             <p>Routine Name: {name}</p>
             <p>goal: {goal}</p>
            
             {
                 isPublic ? (
                     <div>
            
                    <Link to={`/Routines/EditRoutine/${routine.id}`}>Edit</Link>
                    </div>
                 ) :(<div> <Link to={`/Routines/${routine.id}`}>View</Link>
                      </div>
                 )
             }
             </div>
             )  
           }) 
        }
        </div>
    
    )
}

    
    

    

export default Routines;