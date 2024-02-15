import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

function Admin() {

  const navigate = useNavigate();

  const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/login');
	};
  
  const [users,setUsers] = useState([]);
  const [cand,setCand] = useState([]);
  const [elect,setElect] = useState([]);

  //fetch user details
  useEffect(() => {
    axios.get("http://localhost:8000/acceptuserview")
    .then((users)=>{
      setUsers(users.data);
    })
    .catch((err)=>console.error('Error fetching user details:',err));
  },[]);
  
  //remove user details
  const handleUserDelete = async (id) =>{
    try{
      await axios.delete("http://localhost:8000/uremove/"+id)
      setUsers(users.filter((user) => user.id !== id));
      console.log("user deleted successfully")
      window.location.reload(false);
    }catch(error){
      console.error('error deleting user', error);
    }
  }

  //fetch candidates details
  useEffect(() => {
    axios.get("http://localhost:8000/cview")
    .then((cand)=>{
      setCand(cand.data);
    })
    .catch((err)=>console.error("Error fetching candidates details:",err));
  },[]);
  //reject the candidates
  const handleCandidateDelete = async (id) =>{
    try{
      await axios.delete("http://localhost:8000/cremove/"+id)
      setUsers(cand.filter((cand) => cand.id !== id));
      console.log("user deleted successfully")
      window.location.reload(false);
    }catch(error){
      console.error('error deleting user', error);
    }
  }

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
          <HowToVoteIcon/>
            <h2>Admin Dashboard</h2>
            <ul>
                <li><a href='#dashboard'>Dashboard</a></li>
                <li><a href='#users'>Users</a></li>
                <li><a href='#report'>Reports</a></li>
                <li><a href='#candidates'>Candidates</a></li>
                <li><a href='#election'>Election</a></li>
                <li>
                  <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
        <div className={styles.content}>
          <h2>Welcome, Admin!</h2>

          <div id='users' className={styles.tableContainer}>
            <h3>User List</h3>
            <Link to='/acceptanceform'>UserAcceptance</Link>
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
                    return<tr key={user.id}> 
                      <td>{user.username}</td>
                      <td></td>
                      <td>{user.email}</td>
                      <td></td>
                      <td>{user.rollNo}</td>
                      <td><button className={styles.redBtn}
                            onClick={() => handleUserDelete(user._id)}>remove</button></td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>

          <div id='candidates' className={styles.tableContainer}>
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
                      <td><button className={styles.redBtn}
                            onClick={() => handleCandidateDelete(cand._id)}>reject</button></td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>

          <div id='election' className={styles.tableContainer}>
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
                <th></th>
                <th></th>
                
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

          <div id='report'>
            <h3>Reports</h3>
          </div>

        </div>
    </div>
  )
}

export default Admin