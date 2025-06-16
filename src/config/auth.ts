// AWS Cognito Configuration
export const COGNITO_CONFIG = {
  REGION: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  USER_POOL_ID: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
  USER_POOL_CLIENT_ID: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  SIGNUP_ENDPOINT: '/auth/signup',
  SIGNIN_ENDPOINT: '/auth/signin',
};

// Exports expected by authService.ts
export const auth = {
  userPoolId: COGNITO_CONFIG.USER_POOL_ID,
  userPoolWebClientId: COGNITO_CONFIG.USER_POOL_CLIENT_ID,
  region: COGNITO_CONFIG.REGION,
};

export const api = {
  baseUrl: API_CONFIG.BASE_URL,
  endpoints: {
    signup: API_CONFIG.SIGNUP_ENDPOINT,
    signin: API_CONFIG.SIGNIN_ENDPOINT,
  }
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${api.baseUrl}${endpoint}`;
};
