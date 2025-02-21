import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    email: ""
  });

  const [students, setStudents] = useState([]);

  const [edit, setedit] = useState(false)
  const [currentid, setcurrentid] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (edit) {

        const response = await axios.put(`http://localhost:5000/api/student/${currentid}`, studentData);
        console.log("Updated Successfull");

        setStudents(
          students.map(student =>
            student.id === currentid ? { ...student, ...studentData } : student
          )
        );
      }
      else {
        const response = await axios.post('http://localhost:5000/api/student', studentData);
        console.log("Data submitted successfully", response.data);
        fetchStudents();

        setStudentData({
          name: "",
          age: "",
          email: ""
        })
      }


    }

    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    }

    useEffect(() => {
      fetchStudents();
    }, []);


    const EditOn = function (student) {
      setedit(true)
      setcurrentid(student.id)
      setStudentData(student)

    }



    const Deleteon = function(student){
      axios.delete(`http://localhost:5000/api/student/${student.id}`)
      console.log("DELETED SUCCESSFULL");
      fetchStudents()
      
    }

    const handleInputChange = (e) => {
      setStudentData({ ...studentData, [e.target.name]: e.target.value });
    }

    return (
      <div className="student">
        <h2> {edit ? "Update STUDENT" : "Add student"}</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="name" placeholder="name" value={studentData.name} onChange={handleInputChange} />
          </div>

          <div>
            <input type="number" name="age" placeholder="age" value={studentData.age} onChange={handleInputChange} />
          </div>

          <div>
            <input type="text" name="email" placeholder="email" value={studentData.email} onChange={handleInputChange} />
          </div>

          <button type="submit">{edit ? "Update" : "Submit"}</button>
        </form>

        <h3>Student List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>email</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                <td><button onClick={() => EditOn(student)}>EDIT</button></td>
                <td><button onClick={()=>Deleteon(student)}>DELETE</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default App;
