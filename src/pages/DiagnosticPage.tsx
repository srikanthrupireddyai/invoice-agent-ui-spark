import React from 'react';
import { Link } from 'react-router-dom';

const DiagnosticPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Diagnostic Page</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Application Status</h2>
        
        <div className="mb-6">
          <p className="text-green-600 font-medium">✅ React is rendering correctly</p>
          <p className="text-gray-600 mt-2">
            If you can see this page, React is working properly. The blank page issue has been resolved.
          </p>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Navigation Links</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/" className="block p-3 bg-blue-100 hover:bg-blue-200 rounded text-center">
            Home Page (Index)
          </Link>
          <Link to="/signin" className="block p-3 bg-blue-100 hover:bg-blue-200 rounded text-center">
            Sign In Page
          </Link>
          <Link to="/login" className="block p-3 bg-blue-100 hover:bg-blue-200 rounded text-center">
            Login Page (Legacy)
          </Link>
          <Link to="/signup" className="block p-3 bg-blue-100 hover:bg-blue-200 rounded text-center">
            Sign Up Page
          </Link>
          <Link to="/dashboard" className="block p-3 bg-blue-100 hover:bg-blue-200 rounded text-center">
            Dashboard (Protected)
          </Link>
          <Link to="/verify-account" className="block p-3 bg-blue-100 hover:bg-blue-200 rounded text-center">
            Verify Account
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-bold text-yellow-800">Troubleshooting Notes</h3>
          <ul className="list-disc pl-5 mt-2 text-yellow-800">
            <li>Both /signin and /login routes are configured for backward compatibility</li>
            <li>Check browser console for any JavaScript errors</li>
            <li>Verify that environment variables are properly configured</li>
            <li>Protected routes require authentication</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticPage;
