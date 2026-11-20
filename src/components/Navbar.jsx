import React, { useState } from 'react';
import { useMarketplace } from '../context/useMarketplace';
import { 
  Search, 
  PlusCircle, 
  MessageSquare, 
  ShieldCheck, 
  User, 
  ArrowRightLeft, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const Navbar = ({ activePage, setActivePage, onOpenUploadModal }) => {
  const { currentUser, users, switchUser, resetDemoData, swaps } = useMarketplace();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Pending swaps count
  const pendingSwapsCount = swaps.filter(
    s => s.receiverId === currentUser.id && s.status === 'pending'
  ).length;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(11, 15, 23, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0 1.5rem'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        height: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('listings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)'
          }}>
            <ArrowRightLeft size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                SWAP<span style={{ color: 'var(--emerald-400)' }}>STYLE</span>
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                Circularity
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1 }}>
              Sustainable Fashion Exchange
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }} className="desktop-nav">
          <button 
            onClick={() => setActivePage('listings')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              color: activePage === 'listings' ? '#fff' : 'var(--text-muted)',
              background: activePage === 'listings' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              border: activePage === 'listings' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem'
            }}
          >
            <Search size={16} />
            Explore Wardrobes
          </button>

          <button 
            onClick={() => setActivePage('calculator')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              color: activePage === 'calculator' ? '#fff' : 'var(--text-muted)',
              background: activePage === 'calculator' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              border: activePage === 'calculator' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem'
            }}
          >
            <Sparkles size={16} color="var(--emerald-400)" />
            Value Calculator
          </button>

          <button 
            onClick={() => setActivePage('chat')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              color: activePage === 'chat' ? '#fff' : 'var(--text-muted)',
              background: activePage === 'chat' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              border: activePage === 'chat' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem'
            }}
          >
            <MessageSquare size={16} />
            Negotiate & Chat
          </button>

          <button 
            onClick={() => setActivePage('dashboard')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              position: 'relative',
              color: activePage === 'dashboard' ? '#fff' : 'var(--text-muted)',
              background: activePage === 'dashboard' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              border: activePage === 'dashboard' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem'
            }}
          >
            <User size={16} />
            My Dashboard
            {pendingSwapsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                background: '#f43f5e',
                borderRadius: '50%'
              }} />
            )}
          </button>

          <button 
            onClick={() => setActivePage('admin')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              color: activePage === 'admin' ? '#fff' : 'var(--text-muted)',
              background: activePage === 'admin' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              border: activePage === 'admin' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem'
            }}
          >
            <ShieldCheck size={16} color="#818cf8" />
            Admin Panel
          </button>
        </nav>

        {/* Right CTA and Profile Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={onOpenUploadModal}
            className="glow-btn"
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <PlusCircle size={18} />
            <span>List Garment</span>
          </button>

          {/* User selector demo switcher */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--emerald-400)'
                }}
              />
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>
                  {currentUser.name.split(' ')[0]}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', lineHeight: 1 }}>
                  {currentUser.role === 'admin' ? 'Admin Mode' : currentUser.city}
                </span>
              </div>
            </div>

            {/* Dropdown to switch accounts or reset */}
            {showUserDropdown && (
              <div style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '260px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', padding: '4px 8px' }}>
                  Switch Test Account
                </div>
                {users.map(u => (
                  <div
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setShowUserDropdown(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: currentUser.id === u.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                      border: currentUser.id === u.id ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent'
                    }}
                  >
                    <img src={u.avatar} alt={u.name} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{u.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{u.role === 'admin' ? '🛡️ Admin' : `📍 ${u.city}`}</div>
                    </div>
                  </div>
                ))}
                
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '4px 0' }} />
                
                <button
                  onClick={() => {
                    resetDemoData();
                    setShowUserDropdown(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    borderRadius: '8px',
                    color: 'var(--rose-500)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <RotateCcw size={14} />
                  Reset Demo Simulation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
