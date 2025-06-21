import styles from '../styles/AuthForms.module.css';

export default function SignupForm() {
  return (
    <div className={styles.authForm}>
      <div className={styles.socialLogins}>
        <button className={`${styles.socialBtn} ${styles.googleBtn}`}>
          Continue with Google
        </button>
        <button className={`${styles.socialBtn} ${styles.facebookBtn}`}>
          Continue with Facebook
        </button>
      </div>
      
      <div className={styles.divider}>or</div>
      
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" required />
        </div>
        
        <button type="submit" className={styles.submitBtn}>SIGN UP</button>
      </form>
      
      <p className={styles.authSwitch}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
}