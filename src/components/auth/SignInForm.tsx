"use client";

import { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    let hasError = false;

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError('Email must contain "@" and end with ".com"');
      hasError = true;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!specialCharRegex.test(password)) {
      setPasswordError("Password must contain at least one special character.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      // Proceed with login (Clear inputs after successful login)
      alert("Logged in successfully!");

      // Clear the input fields
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6"
      action="#"
      method="POST"
    >
      <div className="rounded-md shadow-sm -space-y-px placeholder">
        <div className='placeholder'>
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
          {emailError && (
            <p className="errorHandlingText text-sm ">{emailError}</p>
          )}
        </div>

        <div className='placeholder'>
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
          {passwordError && (
            <p className="errorHandlingText text-sm ">{passwordError}</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
