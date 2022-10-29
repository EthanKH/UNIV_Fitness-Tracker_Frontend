import  {React, useState } from 'react';
import {updateActivity} from '../api'
import { useParams } from 'react-router-dom';




const EditActivity = ({ activities, token, fetchActivities, navigate }) => {
    const { activityID } = useParams();
  
    const [currentActivity] = activities.filter(activity => activity.id === parseInt(activityID));
    console.log(activityID)
    const {name, description} = currentActivity;


 const [newname, setNewName] = useState(name);
const [newdescription, setNewDescription] = useState(description);



async function editActivity() {
    const updatedActivity = {
        name: newname,
        description: newdescription,
      
    }
   
    
    await updateActivity(token,updatedActivity,activityID)
    fetchActivities();
    navigate('/activities')
   
  
  }

  
  return (
    <>
     <form  className='form' onSubmit={(event) => {
      event.preventDefault();
      editActivity();
    
      window.location - '/activities'
    }}>
    <input 
      className="createPost"
        type='text'
        placeholder={name}
        onChange={(event) => setNewName(event.target.value)}
      />
       <input 
      className="createPost"
      id='description'
        type='text'
        placeholder={description}
        onChange={(event) => setNewDescription(event.target.value)}
      />
    {/* <button type="submit">Edit Activity</button> */}
    <button type="submit" onClick={() =>{
     editActivity()
     console.log(editActivity,  "console")
    }}>
      Edit Activity
      </button>

    </form>
    </>
 
   )
}





export default EditActivity;