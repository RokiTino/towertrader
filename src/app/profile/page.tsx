"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import Header from "@/components/layout/Header"
import Link from "next/link"
import { CreditCard, User, Shield, Settings } from "lucide-react"

// Replace Firebase initialization with import from centralized file
import { auth } from "@/lib/firebase"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
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
        // No user is signed in, redirect to login
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!user) {
    return null // This should not happen as we redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header with Actions */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="flex items-center">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL || "/placeholder.svg"}
                      alt="Profile"
                      className="h-16 w-16 rounded-full mr-4"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <span className="text-2xl font-medium text-indigo-800">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.displayName || user.email}</h1>
                    <p className="text-sm text-gray-500">
                      Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold mb-6">Account Information</h2>
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="text-sm text-gray-900">{user.email}</dd>
                    </div>

                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">User ID</dt>
                      <dd className="text-sm text-gray-900">{user.uid}</dd>
                    </div>

                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Email Verified</dt>
                      <dd className="text-sm text-gray-900">
                        {user.emailVerified ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Verified
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Not Verified
                          </span>
                        )}
                      </dd>
                    </div>

                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                      <dd className="text-sm text-gray-900">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                      </dd>
                    </div>

                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Last Sign In</dt>
                      <dd className="text-sm text-gray-900">
                        {user.lastSignInTime ? new Date(user.lastSignInTime).toLocaleDateString() : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
                  <div className="space-y-4">
                    <Link
                      href="/payment"
                      className="flex items-center justify-between w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      <span className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Make a Payment
                      </span>
                      <span>→</span>
                    </Link>

                    <button className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                      <span className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Edit Profile
                      </span>
                      <span>→</span>
                    </button>

                    <button className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                      <span className="flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Security Settings
                      </span>
                      <span>→</span>
                    </button>

                    <button className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                      <span className="flex items-center">
                        <Settings className="h-5 w-5 mr-2" />
                        Account Settings
                      </span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Subscription Status */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <p className="text-yellow-800">No active subscription</p>
                    <p className="text-sm text-yellow-600 mt-1">Upgrade your account to access premium features.</p>
                    <Link
                      href="/payment"
                      className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View plans <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
