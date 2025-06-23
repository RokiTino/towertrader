"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../lib/firebase"
import "../styles/ProfilePage.css" // Assuming you have a CSS file for styling
import Header from "../components/Header"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "User",
          photoURL: currentUser.photoURL,
          emailVerified: currentUser.emailVerified,
          createdAt: currentUser.metadata.creationTime,
          lastSignInTime: currentUser.metadata.lastSignInTime,
        })
      } else {
        router.push("/")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const navigateToPaymentMethods = () => {
    router.push("/paymentMethods")
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="profile-container">
        <Header />
      <div className="profile-content">
        {/* Header Section */}
        <div className="profile-header">
          <h1 className="profile-title">My Account</h1>
          <button
            onClick={handleSignOut}
            className="profile-button"
          >
            Sign Out
          </button>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-card-content">
            <div className="profile-info">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-avatar-placeholder">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div className="profile-details">
                <h2 className="profile-name">{user.displayName}</h2>
                <p className="profile-email">{user.email}</p>
                <div className={`profile-verified ${user.emailVerified ? 'true' : 'false'}`}>
                  {user.emailVerified ? 'Verified' : 'Not Verified'}
                </div>
              </div>
            </div>

            <div className="profile-grid">
              <div className="profile-section">
                <h3 className="profile-section-title">Account Details</h3>
                <div className="profile-field">
                  <span className="profile-field-label">Member Since</span>
                  <span className="profile-field-value">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Last Sign In</span>
                  <span className="profile-field-value">
                    {user.lastSignInTime ? new Date(user.lastSignInTime).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>

              <div className="profile-section">
                <h3 className="profile-section-title">Payment Methods</h3>
                <div className="profile-payment-card">
                  <p className="profile-payment-text">No payment methods added</p>
                  <button
                    onClick={navigateToPaymentMethods}
                    className="profile-button"
                    style={{ width: '100%' }}
                  >
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="profile-features">
          <div className="profile-feature-card">
            <h3 className="profile-feature-title">Order History</h3>
            <p className="profile-feature-description">View your past orders and invoices</p>
            <a href="#" className="profile-link">View History</a>
          </div>
          <div className="profile-feature-card">
            <h3 className="profile-feature-title">Settings</h3>
            <p className="profile-feature-description">Update your account preferences</p>
            <a href="#" className="profile-link">Go to Settings</a>
          </div>
          <div className="profile-feature-card">
            <h3 className="profile-feature-title">Help Center</h3>
            <p className="profile-feature-description">Get help with your account</p>
            <a href="#" className="profile-link">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  )
}