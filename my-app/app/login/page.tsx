'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserData {
  username: string; // Used for email/username in this context
  password: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState(''); // State name remains 'email' for logic consistency
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Local Storage से email/username fetch करने के लिए
    try {
      const storedData = localStorage.getItem('user_data');
      if (storedData) {
        const userData: UserData = JSON.parse(storedData);
        // Pre-fill with the registered email/username
        if (userData.username) {
          setEmail(userData.username); 
        }
      }
    } catch (error) {
      console.error('Error fetching or parsing data from local storage:', error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem('user_data');
    let storedUser: UserData | null = null;

    if (storedUserData) {
        try {
            storedUser = JSON.parse(storedUserData);
        } catch (error) {
            console.error('Error parsing stored data:', error);
        }
    }

    let loginSuccess = false;

    // Login Logic: Hardcoded check and Local Storage check
    if (email === 'admin' && password === 'password123') { // Hardcoded check
        loginSuccess = true;
    } 
    else if (storedUser && email === storedUser.username && password === storedUser.password) {
        // Validation using Local Storage data
        loginSuccess = true;
    }
    
    // IMPORTANT: Do not use alert(). Using it here only because it was present in the original code.
    if (loginSuccess) {
      document.cookie = 'isLoggedIn=true; path=/';
      
      try {
          localStorage.setItem('user_logged_in', 'true');
      } catch (e) {
          console.error("Failed to set login flag in Local Storage", e);
      }
      
      alert('Login Successful!'); 
      router.push('/');
    } else {
      alert('Invalid Email or Password!');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.7rem 0.75rem', 
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: '1rem', // Space below each input
    color: '#333'
  };

  return (
    <main 
      style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        background: '#fff', // White Background
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Left Curved Wave Design (Deep Blue) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '30%', // Adjust width of the curve area
          background: '#041E42', // Deep Blue Color
          clipPath: 'polygon(0 0, 70% 0, 100% 100%, 0 100%)', // Creates the outward curve shape
          zIndex: 1,
        }}
      >
        {/* Welcome to VSChronical Text inside the blue curve (placed centrally) */}
        <div
          style={{
            position: 'absolute',
            left: '20%', // Adjust position based on clipPath
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            textAlign: 'left',
            paddingRight: '20px',
            maxWidth: '80%',
          }}
        >
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              lineHeight: '1.2',
            }}
          >
            Welcome to <br />VS Chronicle
          </h2>
        </div>
      </div>
      
      {/* Top Right Sign Up Button */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10,
        }}
      >
        <Link
          href="/signup"
          style={{
            padding: '0.6rem 1.2rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            textDecoration: 'none',
            color: '#333',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f4f4f4')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
        >
          Sign up
        </Link>
      </div>

      {/* Login Card/Box (Centered on the right side) */}
      <div 
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1, // Takes up remaining space
          marginLeft: '30%', // Starts after the curved section
          zIndex: 2,
        }}
      >
        <div 
          style={{
            width: '100%', 
            maxWidth: '350px', 
            padding: '2rem',
          }}
        >
          {/* Login Title */}
          <h1 
            style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem', 
              color: '#333',
              textAlign: 'center'
            }}
          >
            Sign in
          </h1>
          
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '0.2rem' // Minimal gap for form fields
            }}
          >
            {/* Work Email Field - CHANGED TYPE TO 'TEXT' TO REMOVE BROWSER EMAIL VALIDATION */}
            <div style={{ position: 'relative' }}>
              <input
                type="text" // <--- The Fix is here
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* Password Field */}
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            
           

            {/* Sign in Button (Blue) */}
            <button
              type="submit"
              style={{
                padding: '0.85rem', 
                background: '#476DE8', // Miro-style Blue
                color: 'white',
                border: 'none',
                borderRadius: '4px', 
                cursor: 'pointer',
                fontWeight: '600', 
                fontSize: '1rem',
                transition: 'background-color 0.2s ease',
                marginTop: '0.5rem',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#395AD6')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#476DE8')}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
