import React, { useState} from "react";
import {Link }from 'react-router-dom';
import './Activities.css'
import { deleteActivityFromRoutine } from "../api";

const Activities = (props) => {
    const {activities} = props
    const [searchTerm, setSearchTerm] = useState('')


    const activityMatches = (activity, string) => {
        const {description, name} = activity;
        
        if (name.toLowerCase().includes(string.toLowerCase()) || description.toLowerCase().includes(string.toLowerCase())) {
            return activity
        }
        }

      const filteredActivities = activities.filter(activity => activityMatches(activity, searchTerm));
      const activitiesToDisplay = searchTerm.length ? filteredActivities : activities
  
            return (
                <main>
                <div className="activityAndSearch">
                    <h1 className='activityHeader'>ACTIVITIES</h1>
                    <form className="ActivitiesList" onSubmit = {(event)=> {
                        event.preventDefault();    
                        }
                        }>
                        <input className='activitiesSearchBar'
                        type='text'
                        placeholder="search"
                        onChange = {(event) => setSearchTerm(event.target.value)}
                        ></input>
                        <button className="createActivityButton">
                            <Link to='/createNewActivity'>Create Activity</Link>
                        </button>
                    </form>
                </div>
                <div className="activitiesContainer">
                {activitiesToDisplay.map(activity => {
                const {description, name, id} = activity;
                return <div key={id} className='Activity'>
                        <h3>{name}</h3>
                        <p className='description'>{description}</p>
                        </div>
                        })
                }
                </div>     
         </main>
        )
        }


       


export default Activities;



