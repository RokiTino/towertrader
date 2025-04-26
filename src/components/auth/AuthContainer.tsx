"use client";

import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import './auth-container.css'; // Import the fancy CSS file

export default function AuthContainer() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="auth-container">
        <h2>{isSignIn ? "Sign in to your account" : "Create a new account"}</h2>

        {isSignIn ? <SignInForm /> : <SignUpForm />}

        <div className="smht">
          <a 
            onClick={() => setIsSignIn(!isSignIn)} 
            className="text-link smh "         >
            {isSignIn
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </a>
        </div>

        
      </div>
    </div>
  );
}
