import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';

const AdminAcceptanceFrome = () => {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try{
          //fetch user details registrationStatus === 'pending'
          const res = await axios.get('http://localhost:8000/pendingDetails');
          setUserList(res.data);
        }catch(error){
          console.error('Error fetching user details:', error);
        }
      };

      fetchData();
    }, []);

    const handleAcceptance = async (userId) => {
      try {
        await axios.put(`http://localhost:8000/accept-registration/${userId}`);
        alert('User registration accepted!');
        // Optionally, you can fetch updated user list after acceptance
        const response = await axios.get('http://localhost:8000/uview');
        setUserList(response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error accepting registration:', error);
        alert('Error accepting registration. Please try again.');
      }
    };
    const handleRejection = async (userId) =>{
      try{
        await axios.put(`http://localhost:8000/reject-registration/${userId}`);
        alert('User registration rejected!');
        // Optionally, you can fetch updated user list after rejection
        const response = await axios.get('http://localhost:8000/uview');
        setUserList(response.data);
        window.location.reload();
      }catch(error){
        console.error('Error rejecting registration:', error);
        alert('Error rejecting registration. Please try again.');
      }
    };

  return (
    <div>
        <div>
            <h3>User List</h3>
            <table>
              <thead>
                <th>Name</th>
                <th>Email</th>
                <th>RollNO</th>
                <th></th>
              </thead>
              <tbody>
                {userList.map((user) => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.rollNo}</td>
                        <td>
                            <button onClick={() => handleAcceptance(user._id)}>
                                Accept
                            </button>
                        </td>
                        <td>
                          <button className={styles.redBtn} onClick={() => handleRejection(user._id)}>
                            Reject
                          </button>
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default AdminAcceptanceFrome
