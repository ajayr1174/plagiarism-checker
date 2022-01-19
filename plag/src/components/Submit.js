import { useParams } from "react-router-dom"
import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
const Submit=()=>{
    let user = JSON.parse(localStorage.getItem("user"));
    const {id}=useParams();
    console.log(id)
    const [file, setfile] = useState();

    const fileHandler =(e) =>{
        let f = e.target.files[0];
        setfile(f);

    }

    const submit =async (e) =>{
        e.preventDefault();
        console.log(file)
        const newData=new FormData();
        newData.append('file',file)
        const data=await axios.post(`http://localhost:4000/assingment/submit/${id}`,
        newData,
        {
            headers: {
              Authorization: `Beare ${user.token}`,
            },
          }
        )
        if(data.response.status==200)
        {
            alert('Assignment Create Successfully');
            console.log(data.response)
        }
        else
        {
            alert("something went wrong, try again later")
        }
    }
    return (
        <>
            <Navbar  user={user}/>
            <div className="container mt-5 d-flex  flex-column justify-center">
                <h1 className="text-white">Upload Assingment  </h1>
                    <form className="w-75" >
                    <div className="input-group mb-3 ">
                        <input type="file" className="form-control" id="inputGroupFile02" name="file"  onChange={fileHandler} />
                        <label className="input-group-text" htmlFor="inputGroupFile02">
                        Upload
                        </label>
                    </div>
                    <button className="btn btn-primary" onClick={submit} > Upload </button>
                    </form>
        
      </div>
        </>
    )
}
export default Submit