import React ,{useEffect, useState} from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Viewall() {

    const [data , setData] = useState()
    let user =JSON.parse( localStorage.getItem("user"));   
 
  useEffect(() =>{
    axios.get("http://localhost:4000/assingment/t/view", {
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    }).then((e) =>{
     setData(e.data)
     
    }).catch(error=>{
      console.log(error.response)
    })
  },[])
    


    return (
        < >
          <Navbar user ={user}/>
          <div className="container bg-white mt-5 p-5"
          style={{
          width: "75vw",
          backgroundColor: "white",
          marginTop: "7rem",
          borderRadius: " 1rem",
        }}>
          <div className="row">
            <h3 className="col-md-5">Subject Code</h3>
            <h3 className="col-md-5">Submission Url</h3>
          </div>

          {data && data.map((e) =>(
            <Link to ={`${e.subjectcode}`}>
              <div className="row py-2" key ={e._id} >
              <div className="col-md-5">{e.subject}</div>
              <div className="col-md-5" style={{color:'dodgerblue'}}>http://localhost:3000/submit/{e.subjectcode}</div>
            </div>
          </Link>

         
          ))}
       </div>
        </>
    )
}

export default Viewall
