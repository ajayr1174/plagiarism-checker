import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
const SingleView=()=>{
    const {id}=useParams();
    let user =JSON.parse( localStorage.getItem("user"));  
    const [res,setres]=useState([]) ;
    const [loading,setloading]=useState(false);
    useEffect(async()=>{
        setloading(true)
        const data=await axios.get(`http://localhost:4000/assingment/t/view/${id}`,{
        headers:{
            Authorization: `Bearer ${user.token}`
          }})
        setres(data.data)
        setloading(false)
    },[]);
    return (
        <>
          <Navbar user={user}/>
          <div className="container bg-white mt-5 p-5"
          style={{
          width: "75vw",
          backgroundColor: "white",
          marginTop: "7rem",
          borderRadius: " 1rem",
          
        }}>
         
            {loading?'Please Wait..':
                res.length==0?
                "No Submission Yet":
                <>
                <div className="row">
                <h3 className="col-md-4"style={{textAlign:'center'}}>Name</h3>
                <h3 className="col-md-4"style={{textAlign:'center'}}>Roll No</h3>
                <h3 className="col-md-4"style={{textAlign:'center'}}>% plag</h3>
               </div>
               { 
                res.map((item)=>{
                    return (

                        <div className="row py-2" style={{margin:"1rem",display:'flex',justifyContent:'space-around',alignItems:'center'}}className={parseInt(item.plag)>50?'backgroundDanger':''} key ={item._id} >
                            <div style={{textAlign:'center'}}>{item.name}</div>
                            <div style={{textAlign:'center'}}>{item.rollno}</div>
                            <div style={{textAlign:'center'}}>{item.plag}</div>
                            
                        </div>
                    )
                })
            
            }
                </>
            }
        </div>
        </>
    )
}
export default SingleView