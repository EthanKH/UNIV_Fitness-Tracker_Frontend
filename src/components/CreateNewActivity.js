
import { createActivity } from '../api';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';




const CreateNewActivity = ({ token,fetchActivities, navigate }) => {
 const [name, setName] = useState('');
const [description, setDescription] = useState('');

  const newActivity = {
    name,
    description,
    }
  
  async function addActivity() {
    const result = await createActivity(token, newPost)
    console.log(result)
    fetchActivities();
    navigate('/Activities')
  }
  
  return (
    // This needs to be a form that accepts the 5 request parameters for creating a post
    <>
     <form  class='form' onSubmit={(event) => {
      event.preventDefault();
      addActivity();
    }}>
    <input 
      class="createPost"
        type='text'
        placeholder='Title'
        onChange={(event) => setName(event.target.value)}
      />
       <input 
      class="createPost"
      id='description'
        type='text'
        placeholder='Description'
        onChange={(event) => setDescription(event.target.value)}
      />
    <button type="submit">Create a New Activity</button>
    </form>
    </>
  )
}

export default CreateNewActivity;