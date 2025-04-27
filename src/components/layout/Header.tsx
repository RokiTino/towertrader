'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            
            <div className={styles.container}>
                <div className={styles.innerWrapper}>
                    {/* Logo Section */}
                    <div className={styles.logoSection}>
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/images/finalLogoWithOutBack.png"
                                alt="Tower Trader Logo"
                                width={80}
                                height={80}
                                className={styles.logoImage}
                                priority
                            />
                        </div>
                        <h1 className={styles.title}>Tower Trader</h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className={styles.nav}>
                        <Link
                            href="/"
                            className={`${styles.link} ${pathname === "/" ? styles.activeLink : ""}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/profile"
                            className={`${styles.link} ${styles.link} ${pathname === "/profile" ? styles.activeLink : ""}`}
                        >
                            Profile
                        </Link>
                        <Link
                            href="/auth"
                            className={`${styles.link} ${styles.link} ${pathname === "/profile" ? styles.activeLink : ""}`}
                        >
                            Sign In
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
