import React, {useState} from "react";
import Navbar from "./Navbar";

function DashbordStudent() {

  let user =JSON.parse( localStorage.getItem("user"));
  console.log(user)

    const [file, setfile] = useState();

    const fileHandler =(e) =>{
        let f = e.target.files[0];
        setfile(f);

    }

    const submit =(e) =>{
        e.preventDefault();
        console.log(file)
    }

  return (
    <>
      <Navbar user={user}/>
     
      <div className="container mt-5 d-flex  flex-column">
      <h1 className="text-white">Upload Assingment  </h1>
        <form className="w-75" >
          <div className="input-group mb-3 ">
            <input type="file" className="form-control" id="inputGroupFile02" name="file"  onChange={fileHandler} />
            <label className="input-group-text" htmlFor="inputGroupFile02">
              Upload
            </label>
          </div>
          <button className="btn btn-primary" onClick={submit} > Uplaod
          </button>
        </form>
      </div>
    </>
  );
}

export default DashbordStudent;
