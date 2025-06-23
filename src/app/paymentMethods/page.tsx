"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "../styles/PaymentMethods.css" // Assuming you have a CSS file for styling

export default function PaymentMethods() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  
  // Mock data for saved cards
  const [savedCards, setSavedCards] = useState([
    {
      id: "1",
      last4: "4242",
      brand: "Visa",
      expiry: "12/25",
      name: "John Doe"
    },
    {
      id: "2",
      last4: "5555",
      brand: "Mastercard",
      expiry: "05/24",
      name: "John Doe"
    }
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const newCard = {
        id: Date.now().toString(),
        last4: cardNumber.slice(-4),
        brand: getCardBrand(cardNumber),
        expiry: expiryDate,
        name: cardName
      }
      
      setSavedCards([...savedCards, newCard])
      setCardNumber("")
      setCardName("")
      setExpiryDate("")
      setCvv("")
      setLoading(false)
    }, 1500)
  }

  const removeCard = (cardId) => {
    setSavedCards(savedCards.filter(card => card.id !== cardId))
  }

  const getCardBrand = (number) => {
    if (/^4/.test(number)) return "Visa"
    if (/^5[1-5]/.test(number)) return "Mastercard"
    if (/^3[47]/.test(number)) return "American Express"
    return "Card"
  }

  const formatCardNumber = (number) => {
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
  }

  return (
    <div className="payment-container">
      <div className="payment-content">
        {/* Header Section */}
        <div className="payment-header">
          <h1 className="payment-title">Payment Methods</h1>
          <button
            onClick={() => router.back()}
            className="payment-button secondary"
          >
            Back to Profile
          </button>
        </div>

        {/* Add Card Form */}
        <div className="payment-card">
          <div className="payment-card-content">
            <div className="payment-section">
              <h2 className="payment-section-title">Add New Card</h2>
              <form onSubmit={handleSubmit}>
                <div className="payment-form-group">
                  <label className="payment-form-label">Card Number</label>
                  <input
                    type="text"
                    className="payment-form-input"
                    placeholder="1234 5678 9012 3456"
                    value={formatCardNumber(cardNumber)}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={19}
                    required
                  />
                </div>

                <div className="payment-form-group">
                  <label className="payment-form-label">Cardholder Name</label>
                  <input
                    type="text"
                    className="payment-form-input"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div className="payment-form-row">
                  <div className="payment-form-group">
                    <label className="payment-form-label">Expiry Date</label>
                    <input
                      type="text"
                      className="payment-form-input"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value.length <= 5) {
                          // Auto-insert / after MM
                          if (value.length === 2 && !value.includes('/')) {
                            setExpiryDate(value + '/')
                          } else {
                            setExpiryDate(value)
                          }
                        }
                      }}
                      required
                    />
                  </div>

                  <div className="payment-form-group">
                    <label className="payment-form-label">CVV</label>
                    <input
                      type="text"
                      className="payment-form-input"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="payment-button"
                  disabled={loading}
                >
                  {loading ? "Adding Card..." : "Add Card"}
                </button>
              </form>
            </div>

            {/* Saved Cards Section */}
            <div className="payment-section payment-saved-cards">
              <h2 className="payment-section-title">Saved Payment Methods</h2>
              
              {savedCards.length > 0 ? (
                savedCards.map((card) => (
                  <div key={card.id} className="payment-card-item">
                    <div className="payment-card-info">
                      <div className="payment-card-icon">
                        {card.brand === "Visa" ? "VISA" : 
                         card.brand === "Mastercard" ? "MC" : 
                         card.brand === "American Express" ? "AMEX" : "CARD"}
                      </div>
                      <div className="payment-card-details">
                        <div className="payment-card-number">
                          •••• •••• •••• {card.last4}
                        </div>
                        <div className="payment-card-expiry">
                          Expires {card.expiry} • {card.name}
                        </div>
                      </div>
                    </div>
                    <div className="payment-card-actions">
                      <button 
                        className="payment-action-button"
                        onClick={() => removeCard(card.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="payment-empty-state">
                  <div className="payment-empty-icon">💳</div>
                  <p>No saved payment methods</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}