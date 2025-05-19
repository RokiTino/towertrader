"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import { CheckCircle } from "lucide-react"

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your transaction has been completed successfully.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gray-500">Order Number:</p>
                  <p className="font-medium">TT-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date:</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Amount:</p>
                  <p className="font-medium">$225.98</p>
                </div>
                <div>
                  <p className="text-gray-500">Payment Method:</p>
                  <p className="font-medium">Credit Card</p>
                </div>
              </div>
            </div>

            <p className="text-gray-500 mb-6">A confirmation email has been sent to your email address.</p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Return to Home
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="bg-white text-indigo-600 border border-indigo-600 py-2 px-6 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>

          <p className="mt-6 text-gray-500">You will be redirected to the home page in a few seconds...</p>
        </div>
      </div>
    </div>
  )
}
