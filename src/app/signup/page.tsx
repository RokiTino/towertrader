import Header from '../components/Header';
import SignupForm from '../components/SignUpForm';
import styles from '../styles/AuthPage.module.css';

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.authPage}>
        <h1 className={styles.brandTitle}>TowerTrade</h1>
        <p className={styles.tagline}>invest from home.</p>
        <SignupForm />
      </main>
    </div>
  );
}