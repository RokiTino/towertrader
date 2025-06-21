import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import styles from '../styles/AuthPage.module.css';


export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.authPage}>
        <h1 className={styles.brandTitle}>TowerTrade</h1>
        <p className={styles.tagline}>invest from home.</p>
        <LoginForm />
      </main>
    </div>
  );
}