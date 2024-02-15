import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./styles.module.css";
import axios from 'axios';

const SignUp = () => {
    const [userData, setUserData] = useState({
		username: "",
		password: "",
		rollNo: "",
		Dept: "",
        email:""
	});

	const handleInputchange = (e) => {
		const {name, value} = e.target;
		setUserData({...userData, [name]:value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try{
			await axios.post('http://localhost:8000/register-request', userData);
			alert('Registration request submitted successfully!');
		}catch(error){
			console.error('Error submitting registrtion request:', error);
			alert('Error submitting registration request. Please try again.');
		}
	};
	// const [error, setError] = useState("");
	// const navigate = useNavigate();

	// const handleChange = ({ currentTarget: input }) => {
	// 	setData({ ...data, [input.name]: input.value });
	// };

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const url = "http://localhost:8080/register";
	// 		const { data: res } = await axios.post(url, data);
	// 		navigate("/login");
	// 		console.log(res.message);
	// 	} catch (error) {
	// 		if (
	// 			error.response &&
	// 			error.response.status >= 400 &&
	// 			error.response.status <= 500
	// 		) {
	// 			setError(error.response.data.message);
	// 		}
	// 	}
	// };

    return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="Name"
							name="username"
							onChange={handleInputchange}
							value={userData.username}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="password"
							name="password"
							onChange={handleInputchange}
							value={userData.password}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="RollNo"
							name="rollNo"
							onChange={handleInputchange}
							value={userData.rollNo}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="department"
							name="Dept"
							onChange={handleInputchange}
							value={userData.Dept}
							required
							className={styles.input}
						/>
                        <input
							type="email"
							placeholder="email"
							name="email"
							onChange={handleInputchange}
							value={userData.email}
							required
							className={styles.input}
						/>
						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
    )
}

export default SignUp