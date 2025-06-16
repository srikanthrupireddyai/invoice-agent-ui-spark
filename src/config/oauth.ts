// OAuth configuration for various integrations
export const ZOHO_CONFIG = {
  // OAuth URL for Zoho authorization
  OAUTH_URL: import.meta.env.VITE_ZOHO_OAUTH_URL || 'https://accounts.zoho.com/oauth/v2/auth',
  
  // Scopes required for Zoho Books integration
  SCOPES: import.meta.env.VITE_ZOHO_SCOPES || 'ZohoBooks.invoices.READ,ZohoBooks.invoices.UPDATE',
  
  // Client ID (to be filled by the user)
  CLIENT_ID: import.meta.env.VITE_ZOHO_CLIENT_ID || '',
  
  // Redirect URI after OAuth flow completion
  REDIRECT_URI: import.meta.env.VITE_ZOHO_REDIRECT_URI || 'http://localhost:8000/callback',
  
  // Response type for the OAuth flow
  RESPONSE_TYPE: 'code',
  
  // Access type (offline to get refresh token)
  ACCESS_TYPE: 'offline'
};

/**
 * Constructs the full OAuth URL with all required parameters
 * @param config The OAuth configuration object
 * @returns Full OAuth URL string
 */
export const constructOAuthUrl = (config: typeof ZOHO_CONFIG): string => {
  const params = new URLSearchParams({
    scope: config.SCOPES,
    client_id: config.CLIENT_ID,
    response_type: config.RESPONSE_TYPE,
    access_type: config.ACCESS_TYPE,
    redirect_uri: config.REDIRECT_URI
  });
  
  return `${config.OAUTH_URL}?${params.toString()}`;
};
