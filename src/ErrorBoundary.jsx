import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b0f17',
          color: '#fff',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <h2 style={{ color: '#f43f5e', marginBottom: '1rem' }}>Something went wrong loading SwapStyle</h2>
          <pre style={{
            background: 'rgba(255,255,255,0.06)',
            padding: '1rem',
            borderRadius: '8px',
            maxWidth: '600px',
            overflowX: 'auto',
            marginBottom: '1.5rem',
            color: '#f8fafc'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: '#10b981',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Clear Local Storage & Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
