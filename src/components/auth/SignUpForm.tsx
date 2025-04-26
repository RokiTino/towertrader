'use client';

import { useState } from 'react';

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/; // Full name validation (first and last name)

        let hasError = false;

        // Name validation
        if (!nameRegex.test(name)) {
            setNameError('Full name must contain both first and last names.');
            hasError = true;
        } else {
            setNameError('');
        }

        // Email validation
        if (!emailRegex.test(email)) {
            setEmailError('Email must contain "@" and end with ".com"');
            hasError = true;
        } else {
            setEmailError('');
        }

        // Password validation
        if (!specialCharRegex.test(password)) {
            setPasswordError('Password must contain at least one special character.');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!hasError) {
            // Submit the form or handle success
            alert('Form submitted successfully!');

            // Clear the input fields after successful submission
            setName('');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
                <div className='placeholder'>
                    <label htmlFor="name" className="sr-only">
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="placeholder appearance-none rounded-t-md relative block w-full px-3 py-2 border border-none placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Full Name"
                    />
                    {nameError && (
                        <p className="errorHandlingText text-sm ">{nameError}</p>
                    )}
                </div>
                <div className='placeholder'>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="placeholder appearance-none relative block w-full px-3 py-2 border border-none placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                    {emailError && (
                        <p className="errorHandlingText text-sm ">{emailError}</p>
                    )}
                </div>
                <div className='placeholder'> 
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="placeholder appearance-none rounded-b-md relative block w-full px-3 py-2 border border-none placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                    Sign Up
                </button>
            </div>
        </form>
    );
}