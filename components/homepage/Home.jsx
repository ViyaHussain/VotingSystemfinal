import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    Dept: '',
    position: '',
    applicationDate: ''
  });
  const [error, setError] = useState("");
  const [cand,setCand] = useState([]);

  const handleChange = ({currentTarget:input}) => {
    setFormData({
      ...formData,
      [input.name]: input.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const url ="http://localhost:8000/cadd";
      const {formData:res} = await axios.post(url,formData);
      console.log(res.message);
    }catch(error){
      if(
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ){
        setError(error.response.formData.message);
      }
    }

  };

  useEffect(() => {
    //fetch candidates details
    axios.get("http://localhost:8000/cview")
    .then((cand)=>{
      setCand(cand.data);
    })
    .catch((err)=>console.error("Error fetching candidates details:",err));
  },[]);

  return (
    <div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>UnionWithUs</h1>
        <div className={styles.nav_links}>
          <a href="#home">Home</a>
          <a href='#about'>About</a>
          <a href='#apply'>Apply for election</a>
          <a href='#'>Profile</a>
          <a href='#'>Result</a>
        </div>
				<button className={styles.logOutBtn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
      <div id='home'>
        <img
          src="https://d13qu023z75971.cloudfront.net/2021/11/Electronic-Voting-Blog---Image----1-.png"
          alt="voting"
          width="75%"
          height="600px"
          
        />
        <Link to='/votingpage'>
        <button className={styles.voting_btn}>Make Your Mark</button>
        </Link>
        
      </div>
      <div id='about' style={{marginBottom:'25%'}}>
        <h2><center>About</center></h2>
        <p>
        Voting is a method for a group, 
        such as a meeting or an electorate, 
        in order to make a collective decision or sepness on opinion usually following discussions, 
        debotes or election campaigns Democrables etact holders of high office by voting Residents of a place represented by an elected official are called "constituents,
        and those constituents who cast a ballot for their chosen candidate are carried votars".
        There are different systems for collecting votes, 
        but while mony of the systems used in decision-making can also be used os Rectoral systems,
        any which cater for proportionat representation can only be used in elections
        </p>
        <img
          src="https://talexes.com/wp-content/uploads/2016/09/select-the-best-candidate.jpg"
          alt='apply'
          width='500px'
          height='300px'
          style={{position:'absolute', right:'5%'}}
        />
      </div>
      <div id='apply' className={styles.forms} style={{position:'absolute', left:'1%'}}>
        <h2>Candidate Form</h2>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className='formColum'>
            <label htmlFor='name'>Name:</label>
              <input type='text' id='name' name='name' value={formData.name} onChange={handleChange}/>
            <label htmlFor='email'>Email:</label>
              <input type='emai' id='email' name='email' value={formData.email} onChange={handleChange}/>
            <label htmlFor='rollNo'>RollNo:</label>
              <input type='text' id='rollNo' name='rollNo' value={formData.rollNo} onChange={handleChange}/>
          </div>
          <div className={styles.formColum}>
            <label htmlFor='Dept'>Department:</label>
              <input type='text' id='Dept' name='Dept' value={formData.Dept} onChange={handleChange}/>
            <label htmlFor='position'>Position:</label>
              <input type='text' id='position' name='position' value={formData.position} onChange={handleChange}/>
            <label htmlFor='applicationDate'>Application Date:</label>
              <input type='text' id='applicaitonDate' name='applicationDate' value={formData.applicaitonDate} onChange={handleChange}/>
              </div>
            {error && <div className={styles.error_msg}>{error}</div>}
          <button type='submit'>Apply Now</button>
        </form>
      </div>
      <div>
      <table className={styles.tables} style={{position:'absolute', right:'5%'}}>
              <thead>
                <th>Name</th>
                <th></th>
                <th>Department</th>
                <th></th>
                <th>Position</th>
              </thead>
              <tbody>
                {
                  cand.map(cand =>{
                    return<tr>
                      <td>{cand.name}</td>
                      <td></td>
                      <td>{cand.Dept}</td>
                      <td></td>
                      <td>{cand.position}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
      </div>
		</div>
  )
}

export default Home