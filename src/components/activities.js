import React, { useState} from "react";
import {Link }from 'react-router-dom';
import './Activities.css'
import {  } from "../api";

const Activities = (props) => {
    const {activities} = props
  
            return (
                <div className='activityMain'>
                    <div className="activityAndSearch">
                        <h1 className='activityHeader'>Activities</h1>
                        <form onSubmit = {(event)=> {
                            event.preventDefault();
                            searchPost(searchTerm)
                            
                            }
                            }>
                            <input className='activitySearchBar'
                            type='text'
                            placeholder="search"
                            onChange = {(event) => setSearchTerm(event.target.value)}
                            ></input>
                            <button type='submit'>Search</button>
                            <button className="createActivityButton">
                                <Link to='/CreateNewActivity'>Add New Activity</Link>
                            </button>
                        </form>
                    </div>
                
            {activities.map(activity => {
                    const {description, name, id} = activity;
                    return <div key={id} className='Activity'>
                            <h3>{name}</h3>
                            <p>{description}</p>
                        </div>}
                )}
             </div>
            )
        }


export default Activities;



