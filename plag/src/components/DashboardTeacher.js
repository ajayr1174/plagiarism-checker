import React from "react";
import Navbar from "./Navbar";

function DashboardTeacher() {
  return (
    <>
      <Navbar />

      <div className="container w-75 mx-auto mt-5">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Roll No.</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Plagiarism</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DashboardTeacher;
