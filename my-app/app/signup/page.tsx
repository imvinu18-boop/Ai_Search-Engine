'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // 1. Link component imported

interface UserData {
  username: string;
  password: string;
}

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Error: Password and Confirm Password do not match!');
      return;
    }

    // A basic password length check for a better user experience.
    if (password.length < 8) {
      alert('Error: Password must be at least 8 characters long!');
      return;
    }

    try {
      const storedData = localStorage.getItem('user_data');
      if (storedData) {
        const storedUser: UserData = JSON.parse(storedData);
        
        if (storedUser.username === username) {
          alert('Error: This Username is already registered. Please login or use a different username.');
          return; 
        }
      }
    } catch (error) {
      console.error('Error checking local storage:', error);
    }

    try {
      const userData = {
        username: username,
        password: password, 
      };
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      alert(`Signup successful! Your data is saved locally.`);
    } catch (error) {
      console.error('Error saving to local storage:', error);
      alert('Signup successful, but Local Storage failed to save data.');
    }

    router.push('/login');
  };

  // --- Style Improvements for Compact Layout ---
  const inputStyle = {
    width: '100%',
    padding: '0.6rem 0.75rem', // Slightly increased padding for better appearance
    border: '1px solid #0e0c0cff',
    borderRadius: '4px', // Slight change in border radius
    fontSize: '1rem', // Standard font size for inputs
    outline: 'none',
    boxSizing: 'border-box' as const, // Important for padding/border not to increase width
  };

  const labelStyle = { 
    fontSize: '0.9rem', // Increased label size slightly for clarity
    color: '#333',
    marginBottom: '0.2rem', // Minimal space between label and input
    display: 'block',
    fontWeight: '500', // Added weight for better visibility
  };

  return (
    <main
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#1A2D2C', // Dark Teal Background
        color: '#060a09ff', 
        fontFamily: 'Inter, sans-serif',
        
        boxSizing: 'border-box', 
        padding: '0.5rem', 
      }}
    >
      {/* Left Side: Welcome Text */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', 
          alignItems: 'flex-start',
          paddingTop: '20vh', 
          paddingLeft: '4rem', 
          maxWidth: '50%',
        }}
      >
        <h1
          style={{
            fontSize: '3.8rem', // Slightly increased font size for "Welcome to VSChronical"
            fontWeight: 'bold',
            lineHeight: '1.2',
            color: '#68FFC8',
            marginBottom: '0.75rem', // Added a bit more space below H1
          }}
        >
          Welcome to <br />VS Chronicle
        </h1>
        <p
          style={{
            fontSize: '1rem', // Standardized to 1rem for better readability
            color: '#237272ff',
            maxWidth: '350px',
          }}
        >
          Thanks for choosing this AI Bot <br/>
          Developed By : Vinod , Shruti 
        </p>
     
      </div>

      {/* Right Side: Signup Form (Compact Card) */}
      <div
        style={{
          width: '350px', // Slightly increased width for a better feel
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          padding: '2rem', // Balanced internal padding
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          flexShrink: 0,
          alignSelf: 'center', 
          margin: '2rem', // Increased margin from the edge
        }}
      >
        <h2
          style={{
            fontSize: '1.6rem', // Increased form title size
            fontWeight: '600',
            color: '#333',
            marginBottom: '1.5rem', // Added space below title
            textAlign: 'center',
          }}
        >
          Create Account
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem', // Managed vertical spacing using the gap property
            width: '100%',
          }}
        >
          {/* Username Field */}
          <div style={{ marginBottom: '0' }}>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <input
              type="text"
              id="username"
              placeholder="Type your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '0' }}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="At least set strong password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            {/* Added a hint for the user below the password field */}
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.3rem' }}>
              At least 8 characters
            </p>
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '0.5rem' }}>
            <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.8rem 1.2rem',
              background: '#1A2D2C', 
              color: 'white',
              border: 'none',
              borderRadius: '5px', 
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              marginTop: '0.5rem',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#294341')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1A2D2C')}
          >
            Sign Up
          </button>
        </form>

        {/* 2. Login Link Added Here */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#555' }}>
          Already have an account?{' '}
          <Link 
            href="/login" 
            style={{ 
              color: '#1A2D2C', // Using the dark teal color for the link
              fontWeight: '600', 
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#378375ff')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#1A2D2C')}
          >
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}