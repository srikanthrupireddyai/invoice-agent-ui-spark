import React from 'react';

// Super minimal component with no dependencies
const SimpleApp = () => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
      marginTop: '100px'
    }}>
      <h1 style={{ color: '#4444dd' }}>Hello World</h1>
      <p>This is a minimal React component with no dependencies.</p>
      <p>If you can see this, React is rendering correctly.</p>
      <button 
        onClick={() => alert('Button works!')}
        style={{
          background: '#4444dd',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Click Me
      </button>
    </div>
  );
};

export default SimpleApp;
