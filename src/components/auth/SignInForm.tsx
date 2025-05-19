"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// Replace Firebase initialization with import from centralized file
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [authError, setAuthError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

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

        // Redirect to home page
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

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
      <div className="rounded-md shadow-sm -space-y-px placeholder">
        <div className="placeholder">
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-none placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
          {emailError && <p className="errorHandlingText text-sm text-red-500">{emailError}</p>}
        </div>

        <div className="placeholder">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-none placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm placeholder"
            placeholder="Password"
          />
          {passwordError && <p className="errorHandlingText text-sm text-red-500">{passwordError}</p>}
        </div>
      </div>

      {authError && (
        <div className="rounded-md bg-red-50 p-2">
          <p className="text-sm text-red-500">{authError}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </form>
  )
}
