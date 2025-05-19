"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"

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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-black">User Profile</h1>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                {user.photoURL ? (
                  <img src={user.photoURL || "/placeholder.svg"} alt="Profile" className="h-24 w-24 rounded-full" />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-2xl font-medium text-indigo-800">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <dl className="divide-y divide-gray-200">
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{user.email}</dd>
                  </div>

                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                    <dd className="text-sm text-black">{user.uid}</dd>
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
        </div>
      </div>
    </div>
  )
}
