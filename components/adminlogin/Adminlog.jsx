import React, { useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Adminlog() {
	const navigate = useNavigate()
    const [data,setData]=useState({username: "", password: "" });
    const [error,setError]=useState("");

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/adminlogin";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			console.log('before navigation')
			//go to dashboard page
			navigate("/dashboard");
			console.log('after navigation')
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <div className={styles.login_container}>
        <div className={styles.login_form_container}>
			<div className={styles.left}>
				<form className={styles.form_container} onSubmit={handleSubmit}>
					<h1>Login to Your Account</h1>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>

						<Link to="/forgot-password">Forgot Password?</Link>
				</form>
			</div>
            <div className={styles.right}>
				<h1>Go Back ?</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Back
						</button>
					</Link>
			</div>
        </div>
    </div>
  )
}

export default Adminlog