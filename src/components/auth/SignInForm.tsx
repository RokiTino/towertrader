"use client"

import type React from "react"

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
import { auth } from "@/lib/firebase"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaApple } from "react-icons/fa"

export default function SignInForm() {
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
    <div className="w-full max-w-md mx-auto">
      {/* Social Sign In Buttons */}
      <div className="space-y-3 mb-6">
        <button
          type="button"
          onClick={() => handleSocialSignIn("Google")}
          disabled={!!socialLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {socialLoading === "Google" ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <FcGoogle className="h-5 w-5 mr-2" />
          )}
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignIn("Facebook")}
          disabled={!!socialLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-[#1877F2] text-sm font-medium text-white hover:bg-[#166FE5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {socialLoading === "Facebook" ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <FaFacebook className="h-5 w-5 mr-2" />
          )}
          Continue with Facebook
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignIn("Apple")}
          disabled={!!socialLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {socialLoading === "Apple" ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <FaApple className="h-5 w-5 mr-2" />
          )}
          Continue with Apple
        </button>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-6" method="POST">
        <div>
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
            {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        {authError && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Authentication Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{authError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
