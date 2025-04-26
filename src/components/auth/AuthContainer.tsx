'use client';

import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function AuthContainer() {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isSignIn ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                </div>

                {isSignIn ? <SignInForm /> : <SignUpForm />}

                <div className="text-center">
                    <button
                        onClick={() => setIsSignIn(!isSignIn)}
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        {isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
} 