import React from 'react'
import styles from "./styles.module.css";

const Home = () => {
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
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
				<button className={styles.white_btn} onClick={handleLogout}>
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
        <button className={styles.voting_btn}>Go to Voting</button>
      </div>
      <div id='about'>
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
      <div id='apply'>
      </div>
      
		</div>
  )
}

export default Home