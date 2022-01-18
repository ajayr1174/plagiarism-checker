import React from 'react'
import Navbar from './Navbar'

function Viewall() {
    let user =JSON.parse( localStorage.getItem("user"));    
    return (
        < >
          <Navbar user ={user}/>



          this is v
        </>
    )
}

export default Viewall
