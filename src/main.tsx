// Import polyfills first - this fixes AWS SDK issues
import './polyfills'

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Render with error handling
console.log('Main: Initializing application');
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error('Root element not found!');
  } else {
    createRoot(rootElement).render(<App />);
    console.log('App rendered successfully');
  }
} catch (error) {
  console.error('Error rendering app:', error);
}
