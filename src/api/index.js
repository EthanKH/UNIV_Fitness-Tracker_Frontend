const baseURL = 'http://fitnesstrac-kr.herokuapp.com/api'

export const getActivities = async () => {
    try {
        const response = await fetch(`${baseURL}/activities`, {
        headers: {
            'Content-Type': 'application/json',
            }})
        const results = await response.json()

        return results


    } catch (error) {
        console.log ('error getting all activities')
    }
    

}

export const getRoutines = async () => {
    try {
        const response = await fetch(`${baseURL}/routines`, {
        headers: {
            'Content-Type': 'application/json',
            }})
        const results = await response.json()

        return results


    } catch (error) {
        console.log ('error getting all routines')
    }    
}

export const getMyRoutines = async (token, username) => {
    console.log ('in getmyroutines user: ', username, 'token is: ', token)
    try {
        const response = await fetch(`${baseURL}/users/${username}/routines`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }})
        const results = await response.json()

        return results


    } catch (error) {
        console.log ('error getting all routines')
    }

}

export const registerUser = async (username,password) => {
    try {
        const response = await fetch(`${baseURL}/users/register`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            
            })
            
        }) 
       
        const result = await response.json();

        return result

    } catch (error) {
        console.log("error registering user")
    }
}

export const loginUser = async (username,password) => {
    try {
        const response = await fetch (`${baseURL}/users/login`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }) 
        const result = await response.json();

        return result

    } catch (error) {
        console.log("error user is not registered")
    }
}


export const createRoutine = async (token, name, goal, isPublic) => {
    try {
        const response = await fetch(`${baseURL}/routines`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name, 
                goal,
                isPublic,
            })
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error, unable to create new routine')
    }
}


export const deleteRoutine = async (routineId, token) => {
    try {
        const response = await fetch(`${baseURL}/routines/${routineId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token} `
        }
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error deleting routine')
    }
}


export const deleteActivityFromRoutine = async (routineActivityId, token) => {
    try {
        const response = await fetch(`${baseURL}/routine_activities/${routineActivityId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token} `
        }
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error deleting routine')
    }
}

export const getMe = async (token) => {
    try {
        const response = await fetch(`${baseURL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token} `,
            }})
        const results = await response.json()

        return results

    } catch (error) {
        console.log ('error getting user')
    }    
}

export const createActivity = async (token, name, description) => {
    try {
        const response = await fetch(`${baseURL}/activities`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name, 
                description,
            })
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error, unable to create new activity')
    }
}

export const updateActivity = async (token, activityId, name, description) => {
    try {
        const response = await fetch(`${baseURL}/activities/${activityId}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description,
            })
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error, unable to update activity')
    }
}

export const updateRoutine = async (token, routineId, name, goal, isPublic) => {
    try {
        const response = await fetch(`${baseURL}/routines/${routineId}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name, 
                goal,
                isPublic,
            })
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error, unable to update routine')
    }
}

export const getRoutinesForActivity = async (activityId) => {
    try {
        const response = await fetch(`${baseURL}/activities/${activityId}/routines`, {
        headers: {
            'Content-Type': 'application/json',
            }})
        const results = await response.json()

        return results


    } catch (error) {
        console.log ('error getting routines for this activity')
    }
}

export const attachActivityToRoutine = async (token, routineId, activityId, count, duration) => {

    try {
        const response = await fetch(`${baseURL}/routines/${routineId}/activities`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                activityId,
                count, 
                duration,
              })
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error, unable to add activity to routine')
    }
}

export const updateActivityForRoutine = async (token, routineActivityId, count, duration) => {
    try {
        const response = await fetch(`${baseURL}/routines/${routineActivityId}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                count,
                duration,
            })
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error, unable to update activity of routine')
    }
}






