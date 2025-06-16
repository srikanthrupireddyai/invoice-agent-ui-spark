import React from 'react';

const TestApp = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Test Page</h1>
      <p className="text-xl mb-4">If you can see this page, React is rendering correctly.</p>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <p>This is a minimal test component to diagnose rendering issues.</p>
      </div>
    </div>
  );
};

export default TestApp;
