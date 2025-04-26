'use client';

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.innerWrapper}>
                    {/* Social Media Section */}
                    <div className={styles.section}>
                        <h3 className={styles.heading}>Social Media</h3>
                        <div className={styles.links}>
                            <Link href="https://instagram.com" className={styles.link}>Instagram</Link>
                            <Link href="https://linkedin.com" className={styles.link}>LinkedIn</Link>
                        </div>
                    </div>

                    {/* Register Section */}
                    <div className={styles.section}>
                        <h3 className={styles.heading}>Register</h3>
                        <div className={styles.inputGroup}>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className={styles.input}
                            />
                        </div>
                    </div>

                    {/* Login Section */}
                    <div className={styles.section}>
                        <h3 className={styles.heading}>Login</h3>
                        <div className={styles.buttons}>
                            <button className={`${styles.button} ${styles.google}`}>
                                Google login
                            </button>
                            <button className={`${styles.button} ${styles.apple}`}>
                                Apple login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}