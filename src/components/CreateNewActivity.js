import  {React, useState } from 'react';
import {createActivity} from '../api'
import { useParams } from 'react-router-dom';





const CreateNewActivity = ({ token,fetchActivities, navigate }) => {
    console.log(fetchActivities, "is fetch working")
 const [name, setName] = useState('');
const [description, setDescription] = useState('');

  const newActivity = {
    name,
    description,
    }
  
  async function addActivity() {
    const result = await createActivity(token, newActivity)
    console.log("result of new activity",result)
    fetchActivities();
    navigate('/activities')
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