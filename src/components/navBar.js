import './NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({ logout, token }) => {
  return (
    <header>
      <nav className="navbar">
        <Link className="link" to='/'>Home</Link>
        <Link className="link" to='/Routines'>Routines</Link>

{
token ?(
  <>
<Link className="link" to='/' 
          onClick={ () => {
            logout()
        }}>Logout</Link>
        
<Link className="link" to='/MyRoutines'>My Routines</Link>
<Link className="link" to='/Activities'>Activities</Link>
</>
      
): (<>
  <Link className="link" to='/register'>Register</Link>
  <Link className="link" to='/login'>Login</Link>

  </>
)
}
      </nav>
     
    </header>
  )
}

export default NavBar;