import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios';

const Voting = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch candidates data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cview'); // Replace with your actual API endpoint
        setCandidates(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row my-3">
    <div className="col-12">
      <h3 className={styles.textBlack}>Voters Panel</h3>
            <table className={`table ${styles.bgWhite}`}>
              <thead>
                <tr>
                  <th colSpan="4" className={`bg-green ${styles.textWhite}`}>
                    <h5>ELECTION TOPIC:</h5>
                  </th>
                </tr><br/>
                <tr>
                  <th>Candidate Details</th>
                  <th>positon</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(candidate => (
                  <tr key={candidate._id}>
                  <td>
                    <b>{candidate.name}</b>
                    <br />
                  </td>
                  <td>{candidate.position}</td>
                  <td>
                      <button
                        className={`btn btn-md btn-success ${styles.textWhite}`}
                      >
                        Vote
                      </button>
                  </td>
                </tr>
                ))}  
              </tbody>
            </table>
        <p>No active elections.</p>
    </div>
  </div>
  )
}

export default Voting