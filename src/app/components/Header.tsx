'use client'
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.css';
import TowerTrade from '../../../public/images/TowerTrade.png';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image 
          src={TowerTrade} 
          alt="Tower Trade Logo" 
          width={100} 
          height={50}
          priority
          onClick={() => {router.push("/")}}
        />
      </div>
      <nav>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/login">Sign In</Link></li>
        </ul>
      </nav>
    </header>
  );
}