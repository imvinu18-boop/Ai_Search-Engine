'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter import karna zaroori hai
import { Assistant } from "./assistant";
import WelcomeModal from './components/WelcomeModal'; 
import { Bold } from 'lucide-react';

const LOGIN_KEY = 'user_logged_in';
const MODAL_KEY = 'welcome_modal_closed';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 

  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem(LOGIN_KEY) === 'true';
      setIsLoggedIn(loggedIn);
      
      // Logout होने के बाद WelcomeModal को तुरंत दिखाने के लिए MODAL_KEY clear करें
      // Note: यह केवल तब काम करेगा जब isLoggedIn false होगा।
      if (!loggedIn) {
         localStorage.removeItem(MODAL_KEY);
      }
      
    } catch (error) {
      console.error("Local Storage access failed:", error);
    } finally {
      setLoading(false);
    }

    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem(LOGIN_KEY) === 'true';
      setIsLoggedIn(loggedIn);
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // ✅ Logout हैंडल करने के लिए फ़ंक्शन
  const handleLogout = () => {
    try {
      localStorage.removeItem(LOGIN_KEY); // Login status clear
      // MODAL_KEY को क्लियर करने से WelcomeModal फिर से खुल जाएगा
      localStorage.removeItem(MODAL_KEY); 
    } catch (e) {
      console.error("Failed to clear Local Storage flags", e);
    }
    
    // State update और force re-render (जिससे WelcomeModal दिखे)
    setIsLoggedIn(false); 
    
    // Refresh करने की आवश्यकता नहीं है, क्योंकि state update से WelcomeModal अपने आप render हो जाएगा।
    // अगर आप चाहते हैं कि URL में कोई बदलाव न हो, तो router.push('/'); को हटा सकते हैं।
    // router.push('/'); 
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Loading AI Search Engine...
      </div>
    );
  }

  // Conditional Rendering
  return (
    <>
      {/* 1. Logged In state: Assistant UI */}
      {isLoggedIn ? (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>VS Chronicle</h2>

            <button
              onClick={handleLogout}
              style={{ padding: '0.5rem 1rem', background: '#2aa576ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </header>
          <main style={{ flexGrow: 1 }}>
            <Assistant />
          </main>
        </div>
      ) : (
        // 2. Logged Out state: Only WelcomeModal will be rendered.
        <WelcomeModal />
        // "Thanks For Visit..." div हटा दिया गया है
      )}
    </>
  );
}