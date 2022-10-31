import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './MyRoutines.css';
import { deleteRoutine, attachActivityToRoutine, deleteActivityFromRoutine, updateActivityForRoutine } from '../api';


const MyRoutines = ({myRoutines, token, activities, getUsersRoutines}) => {
    console.log(myRoutines)
    const allActivities = activities
    const [activityOption, setActivityOption] = useState("any");
    const [activityCount, setActivityCount] = useState("");
    const [activityDuration, setActivityDuration] = useState("");
    

        if (myRoutines.length > 0) {

        return (
            <div className='myRoutinesContainer'>
                <h2>My Routines</h2>
                    <button className="createNewRoutineButton">
                        <Link to='/CreateRoutine'>Create New Routine</Link>
                    </button>
                {myRoutines.map(routine => {
                    const {name, goal, id} = routine
                    console.log('routine is: ', routine)
                       return ( 
                       <div key={id} className="myRoutine">
                            <h3>{name}</h3>
                            <p>{goal}</p>
                            <button>
                            <Link to={`/EditRoutine/${routine.id}`}>Edit</Link> {/**this page should allow us to edit count and duration of activity for routine*/ }
                            </button>
                            <button onClick={(event) => {event.preventDefault(); deleteRoutine(routine.id,token); getUsersRoutines()}
                                    }>Delete</button>
                            <div className='activitiesForMyRoutine'>
                            {routine.activities.map (activity => {
                                
                                const {name, description, duration, count, routineActivityId} = activity

                                return (<div key={activity.id} className="activityForMyRoutine">
                                    <h4>{name}</h4>
                                    <p>{description}</p>
                                    <p>{count}</p>
                                    <p>{duration}</p>

                                    <button onClick={(event) => {event.preventDefault(); deleteActivityFromRoutine(routineActivityId,token); getUsersRoutines()}
                                    }>Remove Activity</button>
                                </div>
                                )
                            })}
                            <div className='buttonsForMyRoutine'>
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                const result = attachActivityToRoutine(token, routine.id, activityOption, activityCount, activityDuration)
                                setActivityCount('')
                                setActivityDuration('')
                                setActivityOption('any')
                                getUsersRoutines()
                            }}>
                                <span className='activityDropDown'>
                                 <fieldset>
                                    <label htmlFor="selectActivity">Add Activity <span className="activityList">({ allActivities.length })</span></label>
                                    <select 
                                        name="activity" 
                                        id="select-activity"
                                        value={activityOption} 
                                        onChange={(event) => setActivityOption(event.target.value)}>
                                        <option value="any">Any</option>
                                        {allActivities.map((activity) => {
                                            const {description, name, id} = activity;
                                            return <option key={id} className='Activity' value={id}>{name} : {description}</option>
                                            })}
                                        </select>
                                </fieldset>
                                </span>
                                <span className='activityCount'>
                                    <input
                                    type='text'
                                    placeholder='count'
                                    value={activityCount}
                                    onChange={(event)=> {setActivityCount(event.target.value)}}
                                    />
                                </span>
                                <span className='activityDuration'>
                                    <input
                                    type='text'
                                    placeholder='duration'
                                    value={activityDuration}
                                    onChange={(event)=> {setActivityDuration(event.target.value)}}
                                    />
                                </span>
                            <button>Done</button>
                            </form>
                            </div>
                        </div>
                     </div>
                    )})}
            </div>
        )
    } else {
        return (<div>
                    <hr/>
                </div>
        )
    }
}



export default MyRoutines;