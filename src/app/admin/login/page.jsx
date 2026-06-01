"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100dvh',
      width: '100vw',
      position: 'fixed',
      inset: 0,
      margin: 0,
      background: '#d1d5db',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        background: '#ffffff', 
        padding: '50px 40px', 
        borderRadius: '12px', 
        width: '100%', 
        maxWidth: '450px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img 
            src="/logo-web.webp" 
            alt="Ocean Logo" 
            style={{ width: '120px', marginBottom: '20px' }} 
            onError={(e) => e.target.src = '/foot-logo.svg'}
          />
        </div>

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <label style={{ color: '#4b5563', display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Email</label>
            <input 
              type="text" 
              placeholder="Email"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                color: '#1f2937',
                outline: 'none',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{ color: '#4b5563', display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Password</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 48px 12px 16px',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb',
                  color: '#1f2937',
                  outline: 'none',
                  fontSize: '1rem',
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: 'none',
                  background: 'transparent',
                  color: '#6b7280',
                  cursor: 'pointer',
                  borderRadius: '6px',
                }}
              >
                {showPassword ? <FaEyeSlash size={18} aria-hidden /> : <FaEye size={18} aria-hidden />}
              </button>
            </div>
          </div>

          {error && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '0.85rem', margin: '-10px 0' }}>{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '14px',
              borderRadius: '6px',
              border: 'none',
              background: '#0ea5e9',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              marginTop: '10px'
            }}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <a href="#" style={{ marginTop: '25px', color: '#0ea5e9', fontSize: '0.85rem', textDecoration: 'none' }}>
          Forgot password?
        </a>
      </div>
    </div>
  );
}
