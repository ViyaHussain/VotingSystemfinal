import React from 'react'
import styles from "./styles.module.css";

function Admin() {
  return (
    <div className={styles.dashboard-container}>
      <div className={styles.sidebar}>
        <h2>Admin Dashboard</h2>
        <ul>
          <li>Dashboard</li>
          <li>Users</li>
          <li>Reports</li>
          <li>Settings</li>
          {/* Add more menu items as needed */}
        </ul>
      </div>

      <div className={styles.content}>
        <h2>Welcome, Admin!</h2>
        {/* Add content specific to the dashboard */}

        <div className={styles.quick-stats}>
          <div className={styles.stat-card}>
            <h3>Total Users</h3>
            <p>1500</p>
          </div>
          <div className={styles.stat-card}>
            <h3>Reports</h3>
            <p>50</p>
          </div>
          {/* Add more stat cards as needed */}
        </div>
      </div>
    </div>
  )
}

export default Admin