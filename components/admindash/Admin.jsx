import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import axios from 'axios';

function Admin() {

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  
  const [users,setUsers] = useState([]);
  const [cand,setCand] = useState([]);
  const [elect,setElect] = useState([]);

  //fetch user details
  useEffect(() => {
    axios.get("http://localhost:8000/uview")
    .then((users)=>{
      setUsers(users.data);
    })
    .catch((err)=>console.error('Error fetching user details:',err));
  },[]);
  //delete user details
  const handleUserDelete = async(email) =>{
    try{
      await axios.delete("http://localhost:8000/uremove/${user.eamil}");
      setUsers(users.filter(user => user.email !== email));
      console.log("user deleted successfully");
    }catch(error){
      console.error('Error or deleting user:',error);
    }
  };

  //fetch candidates details
  useEffect(() => {
    axios.get("http://localhost:8000/cview")
    .then((cand)=>{
      setCand(cand.data);
    })
    .catch((err)=>console.error("Error fetching candidates details:",err));
  },[]);

  //fetch election details
  useEffect(()=>{
    axios.get("http://localhost:8000/eview")
    .then((elect)=>{
      setElect(elect.data);
      console.log("data is fetching");
    })
    .catch((err)=>console.log("error fetching election details: ",err));
  },[]);

  return (
    <div className={styles.dashboard}>
        <div className={styles.sidebar}>
            <h2>Admin Dashboard</h2>
            <ul>
                <li><a href='#dashboard'>Dashboard</a></li>
                <li><a href='#users'>Users</a></li>
                <li><a href='#report'>Reports</a></li>
                <li><a href='#candidates'>Candidates</a></li>
                <li><a href='#election'>Election</a></li>
                <li>
                  <button style={{background:"#4ff9c3", border:"none", cursor:"pointer"}} onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
        <div className={styles.content}>
          <h2>Welcome, Admin!</h2>

          <div id='#users' style={{marginBottom:"10%"}}>
            <h3>User List</h3>
            <table>
              <thead>
                <th>Name</th>
                <th></th>
                <th>Email</th>
                <th></th>
                <th>RollNO</th>
                <th></th>
                
              </thead>
              <tbody>
                {
                  users.map(user => {
                    return<tr>
                      <td>{user.username}</td>
                      <td></td>
                      <td>{user.email}</td>
                      <td></td>
                      <td>{user.rollNo}</td>
                      <td><button className={styles.redBtn} onClick={()=>handleUserDelete(user.email)}>remove</button></td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>

          <div id='#candidates'>
            <h3>Candidates</h3>
            <table>
              <thead>
                <th>Name</th>
                <th></th>
                <th>RollNo</th>
                <th></th>
                <th>Department</th>
                <th></th>
                <th>Email</th>
                <th></th>
                <th>Position</th>
                <th></th>
                <th>Application Date</th>
                <th></th>
                <th></th>
                <th></th>
              </thead>
              <tbody>
                {
                  cand.map(cand =>{
                    return<tr>
                      <td>{cand.name}</td>
                      <td></td>
                      <td>{cand.rollNo}</td>
                      <td></td>
                      <td>{cand.Dept}</td>
                      <td></td>
                      <td>{cand.email}</td>
                      <td></td>
                      <td>{cand.position}</td>
                      <td></td>
                      <td>{cand.applicationDate}</td>
                      <td></td>
                      <td><button className={styles.greenBtn}>accept</button></td>
                      <td><button className={styles.redBtn}>reject</button></td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>

          <div id='#election'>
            <h3>Elections</h3>
            <button>Add Elections</button>
            <h3>Election List</h3>
            <table>
              <thead>
                <th>Name</th>
                <th></th>
                <th>startingDate</th>
                <th></th>
                <th>endingDate</th>
                <th></th>
                <th>status</th>
                
              </thead>
              <tbody>
                {
                  elect.map(elect => {
                    return<tr>
                      <td>{elect.electionName}</td>
                      <td></td>
                      <td>{elect.startingDate}</td>
                      <td></td>
                      <td>{elect.endingDate}</td>
                      <td></td>
                      <td>{elect.status}</td>
                      <td><button>Update</button></td>
                      <td><button className={styles.redBtn}>Remove</button></td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>

          <div id='#report'>
            <h3>Reports</h3>
          </div>

        </div>
    </div>
  )
}

export default Admin