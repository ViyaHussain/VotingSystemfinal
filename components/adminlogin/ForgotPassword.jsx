import React from 'react'
import styles from './ForgotStyle.module.css'

const ForgotPassword = () => {
  return (
    <div className={styles.password_reset_container}>
        <form className={styles.form_container} >
            <h1>Forgot Password</h1>
            <input type='password'
                placeholder='New Password'
                name='password'
                required
                className={styles.input}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
            />
            <input type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            required
            className={styles.input}
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type='submit' className={styles.green_btn}>Reset Password</button>
            {/* {message && <div className={styles.info_msg}>{message}</div>} */}
        </form>
    </div>
  )
}

export default ForgotPassword