import './NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ logout, token }) => {
  return (
    <header>
      <nav class="navbar">
        <Link class="link" to='/'>Home</Link>
        <Link class="link" to='/Routines'>Routines</Link>

{
token ?(
  <>
<Link class="link" to='/' 
          onClick={ () => {
            logout()
        }}>Logout</Link>
        
<Link class="link" to='/routines/EditRoutine'>Edit Routine</Link>
<Link class="link" to='/MyRoutines'>My Routines</Link>
<Link class="link" to='/Activities'>Activities</Link>
</>
      
): (<>
  <Link class="link" to='/register'>Register</Link>
  <Link class="link" to='/login'>Login</Link>

  </>
)
}
      </nav>
     
    </header>
  )
}

export default Navbar;