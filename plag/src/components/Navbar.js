import React from 'react'
import {FaUserCircle} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom";


function Navbar({user}) {

  // console.log(user)
  const navigate = useNavigate()

    const logout = () =>{
      
      if(JSON.parse(localStorage.getItem("user")).teacher){
        localStorage.removeItem("user");
        navigate("/login-teacher");
      }else{
        localStorage.removeItem("user");
        navigate("/");
      }
     

    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Plagiarism Checker</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
      {user.teacher && <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/create-assingment" className="nav-link " aria-current="page" >Create Assignment</Link>
        </li>
        <li className="nav-item">
          <Link to="/view-all" className="nav-link text-bold" href="#">view All</Link>
        </li>
        
       
      </ul>}
      <div>

     
      <FaUserCircle className='me-2 ' size="2em"/>
      <span className='fs-4 align-middle me-5'>{user.teacher ?user.email: user.rollno}</span>
     
      
      <button className='btn btn-danger' onClick={logout}> Logout   </button>
      </div>   
      
   
  </div>
</nav>
            
        </>
    )
}

export default Navbar
