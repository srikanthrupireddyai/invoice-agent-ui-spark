import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Storage keys for integration status
const INTEGRATION_STATUS_KEY = 'zohoIntegrationStatus';
const INTEGRATION_TIMESTAMP_KEY = 'zohoIntegrationTimestamp';

const ZohoCallback = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Parse URL search params
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const error = params.get('error');
        
        if (error) {
          console.error('Zoho OAuth error:', error);
          setErrorMessage(error);
          setStatus('error');
          
          toast({
            title: 'Authentication Failed',
            description: `Zoho authorization failed: ${error}`,
            variant: 'destructive'
          });
          return;
        }

        if (!code) {
          console.error('No authorization code received');
          setErrorMessage('No authorization code received');
          setStatus('error');
          
          toast({
            title: 'Authentication Failed',
            description: 'No authorization code received from Zoho',
            variant: 'destructive'
          });
          return;
        }

        console.log('Received Zoho authorization code:', code);
        
        // TODO: Exchange the authorization code for tokens
        // This would typically be done by your backend API
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/zoho/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || 'Failed to exchange authorization code');
        }

        const data = await response.json();
        console.log('Token exchange successful');
        
        // Store integration status for the IntegrationManagement component
        sessionStorage.setItem(INTEGRATION_STATUS_KEY, 'connected');
        sessionStorage.setItem(INTEGRATION_TIMESTAMP_KEY, new Date().toISOString());
        
        setStatus('success');
        
        toast({
          title: 'Zoho Integration Successful',
          description: 'Your Zoho account has been connected successfully',
        });

        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } catch (error) {
        console.error('Error processing Zoho callback:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
        setStatus('error');
        
        toast({
          title: 'Connection Failed',
          description: error instanceof Error ? error.message : 'Failed to connect Zoho account',
          variant: 'destructive'
        });
      }
    };

    handleCallback();
  }, [location, navigate, toast]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Zoho Integration</h2>
          
          {status === 'loading' && (
            <div className="mt-6 flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <p className="text-gray-600">Processing your Zoho authorization...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="mt-6 space-y-4">
              <div className="rounded-full bg-green-100 p-4 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Your Zoho account has been connected successfully!</p>
              <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="mt-6 space-y-4">
              <div className="rounded-full bg-red-100 p-4 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-gray-700">Failed to connect your Zoho account</p>
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
              <div className="pt-4">
                <Button onClick={() => navigate('/dashboard')}>
                  Return to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZohoCallback;
