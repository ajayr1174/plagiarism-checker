import React from 'react'
import {FaUserCircle} from "react-icons/fa"

function Navbar() {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Plagiarism Checker</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-bold" href="#">Link</a>
        </li>
        
       
      </ul>
     
      <FaUserCircle className='me-2 ' size="2em"/>
      <span className='fs-4 align-middle me-5'>Ajay</span>
     
      
      
   
  </div>
</nav>
            
        </>
    )
}

export default Navbar
