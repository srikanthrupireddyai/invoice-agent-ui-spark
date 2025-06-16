// Add global to window for AWS SDK compatibility
if (typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}

// Other common polyfills needed for AWS SDK
if (typeof (window as any).Buffer === 'undefined') {
  (window as any).Buffer = { isBuffer: () => false };
}

// Process polyfill
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { 
    env: { DEBUG: undefined },
    browser: true
  };
}
