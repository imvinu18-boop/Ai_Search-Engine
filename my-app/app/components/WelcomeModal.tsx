'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bold } from 'lucide-react';

const MODAL_KEY = 'welcome_modal_closed';
const LOGIN_KEY = 'user_logged_in'; // Login status flag

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [stayOutMessage, setStayOutMessage] = useState<string | null>(null); // New state for message
  const router = useRouter();

  useEffect(() => {
    try {
      // 1. Check if the user is already logged in
      const isUserLoggedIn = localStorage.getItem(LOGIN_KEY);
      if (isUserLoggedIn === 'true') {
        setOpen(false);
        return; 
      }

      // 2. Check if the user has previously closed the modal permanently ('Stay out')
      const hasClosedPermanently = localStorage.getItem(MODAL_KEY);
      
      // अगर logged in नहीं है और 'Stay out' नहीं किया है, तभी modal open करें
      if (hasClosedPermanently !== 'true') {
        setOpen(true);
      }
    } catch (e) {
      console.error("Local Storage access failed:", e);
      setOpen(false); 
    }
  }, []);

  const handleSignup = () => {
    setOpen(false);
    router.push('/signup');
  };
  
  const handleLogin = () => {
    setOpen(false);
    router.push('/login');
  };

  const handleStayOut = () => {
    // 1. Local Storage में flag set करें (Permanent close)
    try {
      localStorage.setItem(MODAL_KEY, 'true'); 
    } catch (e) {
      console.error("Local Storage is unavailable", e);
    }
    
    // 2. Button को disable करें और message दिखाएँ
    setStayOutMessage('Thanks For Visit. Redirecting to Login page in 5 seconds...');
    
    // 3. 5 सेकंड (5000 milliseconds) बाद /login पेज पर रीडायरेक्ट करें
    setTimeout(() => {
      setOpen(false);
      router.push('/login'); // Redirect to login page
    }, 5000);
  };

  if (!open) return null;

  // Styling
  const overlay: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.3)', 
    backdropFilter: 'blur(6px)', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  };

  const modal: React.CSSProperties = {
    width: 'min(500px, 90%)',
    background: '#fff',
    borderRadius: 12,
    padding: '1.5rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    textAlign: 'center',
  };

  const btn: React.CSSProperties = {
    padding: '0.6rem 1rem',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s, opacity 0.2s',
  };
  
  // Check if any button is currently performing a delayed action
  const isRedirecting = stayOutMessage !== null;

  return (
    <div style={overlay} aria-modal="true" role="dialog">
      <div style={modal}>
        <h2 style={{ margin: 0, marginBottom: '0.5rem',fontWeight: 'bold' }}>Thanks! for visiting VS Chronicle</h2>
        <p style={{ marginTop: 0, marginBottom: '1rem' }}>
          Choose an option to continue
        </p>

        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isRedirecting} // Disable during redirect delay
            style={{
              ...btn,
              background: '#0070f3',
              color: '#fff',
              minWidth: 100,
              opacity: isRedirecting ? 0.7 : 1, // Optional: make it look disabled
            }}
          >
            Login
          </button>

          {/* Sign up Button */}
          <button
            onClick={handleSignup}
            disabled={isRedirecting} // Disable during redirect delay
            style={{
              ...btn,
              background: '#e6e6e6',
              minWidth: 100,
              opacity: isRedirecting ? 0.7 : 1,
            }}
          >
            Sign up
          </button>

          {/* Stay out Button */}
          <button
            onClick={handleStayOut}
            disabled={isRedirecting} // Disable during redirect delay
            style={{
              ...btn,
              background: isRedirecting ? '#ddd' : 'transparent', // Change color while waiting
              border: '1px solid #ccc',
              minWidth: 100,
              opacity: isRedirecting ? 0.9 : 1,
            }}
          >
            {isRedirecting ? 'Waiting...' : 'Stay out'}
          </button>
        </div>
        
        {/* New Message Area for Stay out action */}
        {stayOutMessage && (
          <p style={{ 
            color: '#0070f3', 
            marginTop: '1.5rem', 
            fontWeight: '600' 
          }}>
            {stayOutMessage}
          </p>
        )}
      </div>
    </div>
  );
}