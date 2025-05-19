"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import { CreditCard, Calendar, Lock } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  // Sample order details - in a real app, this would come from your cart/order state
  const orderDetails = {
    subtotal: 199.99,
    tax: 16.0,
    shipping: 9.99,
    total: 225.98,
    items: [{ name: "Premium Listing", price: 199.99, quantity: 1 }],
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData({ ...formData, [name]: formatted.substring(0, 19) })
      return
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned
      if (cleaned.length > 2) {
        formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`
      }
      setFormData({ ...formData, [name]: formatted })
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Card name validation
    if (!formData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required"
    }

    // Card number validation
    const cardNumberClean = formData.cardNumber.replace(/\s/g, "")
    if (!cardNumberClean) {
      newErrors.cardNumber = "Card number is required"
    } else if (!/^\d{16}$/.test(cardNumberClean)) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }

    // Expiry date validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Use MM/YY format"
    } else {
      const [month, year] = formData.expiryDate.split("/")
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1

      if (Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
        newErrors.expiryDate = "Invalid month"
      } else if (
        Number.parseInt(year) < currentYear ||
        (Number.parseInt(year) === currentYear && Number.parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = "Card has expired"
      }
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required"
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits"
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = "State is required"
    }

    // Zip code validation
    if (!formData.zipCode) {
      newErrors.zipCode = "ZIP code is required"
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Enter a valid ZIP code"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setLoading(true)

      // Simulate payment processing
      setTimeout(() => {
        setLoading(false)
        // Show success message and redirect
        alert("Payment successful! Thank you for your purchase.")
        router.push("/payment/success")
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Details</h2>

                <form onSubmit={handleSubmit}>
                  {/* Card Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Card Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.cardName ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                      </div>

                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-2 border ${errors.cardNumber ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              className={`w-full pl-10 pr-3 py-2 border ${errors.expiryDate ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                          {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              className={`w-full pl-10 pr-3 py-2 border ${errors.cvv ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                              placeholder="123"
                              maxLength={4}
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                          {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                          placeholder="123 Main St"
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            placeholder="New York"
                          />
                          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            placeholder="NY"
                          />
                          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.zipCode ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                          placeholder="10001"
                        />
                        {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-400"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        `Pay $${orderDetails.total.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="border-b border-gray-200 pb-4">
                    {orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-2">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Order Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium">${orderDetails.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Tax</p>
                      <p className="font-medium">${orderDetails.tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Shipping</p>
                      <p className="font-medium">${orderDetails.shipping.toFixed(2)}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <p className="font-semibold">Total</p>
                        <p className="font-bold text-lg">${orderDetails.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center text-gray-500 text-sm">
                      <Lock className="h-4 w-4 mr-1" />
                      <span>Secure payment processing</span>
                    </div>
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
