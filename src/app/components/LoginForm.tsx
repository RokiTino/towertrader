'use client'
import styles from '../styles/AuthForms.module.css';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth"
// Update the path below if your firebase file is located elsewhere
import { auth } from "../lib/firebase"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaApple } from "react-icons/fa"

export default function LoginForm() {

  
   const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [authError, setAuthError] = useState("")
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)

  const router = useRouter()

  // Initialize providers
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const appleProvider = new OAuthProvider("apple.com")

  // Set custom parameters for Facebook provider only
  facebookProvider.setCustomParameters({
    // Set the redirect URI for Facebook
    redirect_uri: "https://towertrader-56483.firebaseapp.com/__/auth/handler",
  })

  // Check for redirect results on component mount
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result) {
          // User successfully authenticated via redirect
          console.log("Successfully signed in via redirect", result.user)
          router.push("/profile")
        }
      } catch (error: any) {
        console.error("Error with redirect sign-in:", error)
        if (error.code) {
          setAuthError(`Authentication error: ${error.message}`)
        }
      }
    }

    checkRedirectResult()
  }, [router])

  // Check if user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to profile page
        router.push("/profile")
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/

    let hasError = false

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError('Email must contain "@" and end with ".com"')
      hasError = true
    } else {
      setEmailError("")
    }

    // Password validation
    if (!specialCharRegex.test(password)) {
      setPasswordError("Password must contain at least one special character.")
      hasError = true
    } else {
      setPasswordError("")
    }

    if (!hasError) {
      try {
        setLoading(true)
        // Sign in with Firebase
        await signInWithEmailAndPassword(auth, email, password)

        // Clear the input fields
        setEmail("")
        setPassword("")

        // Redirect to profile page
        router.push("/profile")
      } catch (error: any) {
        // Handle Firebase authentication errors
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          setAuthError("Invalid email or password")
        } else if (error.code === "auth/too-many-requests") {
          setAuthError("Too many failed login attempts. Please try again later.")
        } else {
          setAuthError("An error occurred during sign in. Please try again.")
        }
        console.error("Firebase auth error:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSocialSignIn = async (provider: string) => {
    setAuthError("")
    setSocialLoading(provider)

    try {
      let result

      switch (provider) {
        case "Google":
          // Use popup for Google
          result = await signInWithPopup(auth, googleProvider)
          break
        case "Facebook":
          // Use redirect for Facebook with the specific redirect URL
          await signInWithRedirect(auth, facebookProvider)
          return // Early return as redirect will navigate away
        case "Apple":
          // Use popup for Apple
          result = await signInWithPopup(auth, appleProvider)
          break
        default:
          throw new Error("Invalid provider")
      }

      // For popup auth methods that return a result immediately
      if (result) {
        console.log("Successfully signed in with", provider, result.user)
        router.push("/profile")
      }
    } catch (error: any) {
      console.error(`Error signing in with ${provider}:`, error)

      // Handle specific errors
      if (error.code === "auth/account-exists-with-different-credential") {
        setAuthError(
          "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
        )
      } else if (error.code === "auth/popup-closed-by-user") {
        setAuthError("Sign-in popup was closed before completing the sign in.")
      } else if (error.code === "auth/cancelled-popup-request") {
        // This is normal when multiple popups are attempted, no need to show error
        console.log("Popup request cancelled")
      } else if (error.code === "auth/popup-blocked") {
        setAuthError("Sign-in popup was blocked by the browser. Please allow popups for this website.")
      } else {
        setAuthError(`Error signing in with ${provider}. Please try again.`)
      }
    } finally {
      setSocialLoading(null)
    }
  }

  return (
    <div className={styles.authForm}>
      <div className={styles.socialLogins}>
        <button className={`${styles.socialBtn} ${styles.googleBtn}`} onClick={() => handleSocialSignIn("Google")}>
          Continue with Google
        </button>
        <button className={`${styles.socialBtn} ${styles.facebookBtn}`}  onClick={() => handleSocialSignIn("facebook")}>
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
        
        <a href="#" className={styles.forgotPassword}>Forgot password?</a>
        
        <button type="submit" onClick={handleSubmit} className={styles.submitBtn}>LOG IN</button>
      </form>
      
      <p className={styles.authSwitch}>
        Don't have an account? <a href="../signup">Sign up</a>
      </p>
    </div>
  );
}