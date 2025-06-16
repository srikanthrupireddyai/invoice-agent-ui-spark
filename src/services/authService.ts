import { 
  CognitoUserPool, 
  CognitoUserAttribute, 
  CognitoUser, 
  AuthenticationDetails,
  CognitoUserSession,
  ISignUpResult
} from 'amazon-cognito-identity-js';
import { auth, api, buildApiUrl } from '@/config/auth';

// Initialize the user pool
const userPool = new CognitoUserPool({
  UserPoolId: auth.userPoolId,
  ClientId: auth.userPoolWebClientId
});

// Type definitions for authentication operations
export interface SignUpParams {
  email: string;
  password: string;
  businessName: string;
  firstName?: string;
  lastName?: string;
  businessType: string;
  invoicesPerMonth: string;
}

export interface ConfirmSignUpParams {
  email: string;
  confirmationCode: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

interface UserData {
  username: string;
  jwtToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface UserAttributes {
  email: string;
  email_verified: boolean;
  sub: string;
  [key: string]: any;
}

/**
 * Sign up a new user with AWS Cognito
 * @param params Sign up parameters including email, password, and business details
 * @returns Promise resolved with signup result
 */
export const signUp = async (params: SignUpParams): Promise<ISignUpResult> => {
  const { email, password, businessName, firstName, lastName, businessType, invoicesPerMonth } = params;
  
  // Extract the upper limit number from invoicesPerMonth string range
  let invoicesUpperLimit: number = 10; // Default value
  
  if (invoicesPerMonth) {
    if (invoicesPerMonth === "50+") {
      invoicesUpperLimit = 100; // Default upper value for "50+" range
    } else {
      // Extract number after the hyphen (e.g., "1-10" → 10)
      const match = invoicesPerMonth.match(/-(\d+)/);
      if (match && match[1]) {
        invoicesUpperLimit = parseInt(match[1], 10);
      }
    }
  }

  // Set up user attributes - ensure all values are explicitly strings
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: String(email)
    }),
    new CognitoUserAttribute({
      Name: 'custom:business_name',
      Value: String(businessName)
    }),
    new CognitoUserAttribute({
      Name: 'custom:business_type',
      Value: String(businessType)
    }),
    new CognitoUserAttribute({
      Name: 'custom:invoices_per_month',
      Value: String(invoicesUpperLimit) // Send the upper limit number instead of the range string
    })
  ];

  // Add optional attributes if they exist - ensure all values are explicitly strings
  if (firstName) {
    attributeList.push(new CognitoUserAttribute({
      Name: 'given_name',
      Value: String(firstName)
    }));
  }

  if (lastName) {
    attributeList.push(new CognitoUserAttribute({
      Name: 'family_name',
      Value: String(lastName)
    }));
  }

  // Only store email for use during confirmation
  sessionStorage.setItem('userEmail', email);

  // First, register with Cognito
  const cognitoResult = await new Promise<ISignUpResult>((resolve, reject) => {
    userPool.signUp(
      email, 
      password, 
      attributeList, 
      [], // validation data (not used)
      (err, result) => {
        if (err) {
          console.error("Sign up error:", err);
          reject(err);
          return;
        }
        resolve(result!);
      }
    );
  });

  // Then register with our API (unprotected endpoint)
  try {
    console.log('Starting API registration after successful Cognito signup');
    // Format data according to the nested schema structure
    await registerNewUserWithApi({
      tenant_data: {
        business_name: businessName,
        business_type: businessType,
        email: email,
        estimated_invoices_monthly: invoicesUpperLimit // Use the numeric upper limit value
      },
      user_data: {
        email: email,
        first_name: firstName || '',
        last_name: lastName || '',
        role: 'user',
        status: 'pending_confirmation',
        cognito_id: cognitoResult.userSub
      }
    });
    console.log('API registration completed successfully');
  } catch (apiError) {
    console.error("API registration error:", apiError);
    // Add more detailed logging
    console.error("API registration failed with Cognito ID:", cognitoResult.userSub);
    
    // Check if the API URL is correct
    console.log('API base URL:', api.baseUrl);
    console.log('API signup endpoint:', api.endpoints.signup);
    console.log('Full API URL:', buildApiUrl(api.endpoints.signup));
    
    // Throw the error to inform the user - don't silently continue
    throw new Error(`User created in Cognito but backend registration failed: ${apiError.message}. Please contact support.`);
  }

  return cognitoResult;
};

/**
 * Confirm sign up with verification code
 * @param params Parameters including email and confirmation code
 * @returns Promise resolved when the confirmation is successful
 */
export const confirmSignUp = (params: ConfirmSignUpParams): Promise<void> => {
  const { email, confirmationCode } = params;

  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(
      confirmationCode, 
      true, // forceAliasCreation
      (err, result) => {
        if (err) {
          console.error("Confirmation error:", err);
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
};

/**
 * Sign in a user with AWS Cognito
 * @param params Sign in parameters including email and password
 * @returns Promise resolved with user data including tokens
 */
export const signIn = (params: SignInParams): Promise<UserData> => {
  const { email, password } = params;

  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session: CognitoUserSession) => {
        const userData: UserData = {
          username: email,
          jwtToken: session.getIdToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
          expiresAt: session.getIdToken().getExpiration() * 1000 // Convert to milliseconds
        };

        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        resolve(userData);
      },
      onFailure: (err) => {
        console.error("Sign in error:", err);
        reject(err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // This is called when the user needs to change their password
        // Not handling this case in this implementation
        reject(new Error("You need to change your password before continuing."));
      }
    });
  });
};

/**
 * Check if a user is currently signed in and session is valid
 * @returns User data if signed in, null otherwise
 */
export const getCurrentUser = (): UserData | null => {
  // Check if we have stored user data
  const userDataStr = localStorage.getItem('userData');
  if (!userDataStr) {
    return null;
  }

  try {
    const userData: UserData = JSON.parse(userDataStr);
    
    // Check if the session is expired
    if (userData.expiresAt < Date.now()) {
      // Session expired, need to refresh or clear
      return null;
    }
    
    return userData;
  } catch (err) {
    console.error("Error parsing user data:", err);
    return null;
  }
};

/**
 * Sign out the current user
 */
export const signOut = (): void => {
  const currentUser = userPool.getCurrentUser();
  if (currentUser) {
    currentUser.signOut();
  }
  localStorage.removeItem('userData');
};

/**
 * Get current user attributes
 * @returns Promise resolved with user attributes
 */
export const getUserAttributes = (): Promise<UserAttributes> => {
  const cognitoUser = userPool.getCurrentUser();

  if (!cognitoUser) {
    return Promise.reject(new Error("No current user"));
  }

  return new Promise((resolve, reject) => {
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err) {
        reject(err);
        return;
      }

      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
          return;
        }

        if (!attributes) {
          reject(new Error("No attributes found"));
          return;
        }

        const userAttributes: UserAttributes = {
          email: '',
          email_verified: false,
          sub: ''
        };

        attributes.forEach(attribute => {
          userAttributes[attribute.getName()] = attribute.getValue();
        });

        resolve(userAttributes);
      });
    });
  });
};

/**
 * Register a new user with the backend API (unprotected endpoint)
 * @param userData User data to register
 * @returns Promise resolved when the user is registered with the API
 */
export const registerNewUserWithApi = async (userData: any): Promise<any> => {
  console.log('Registering user with API:', buildApiUrl(api.endpoints.signup));
  console.log('User data being sent:', JSON.stringify(userData));
  
  try {
    const response = await fetch(buildApiUrl(api.endpoints.signup), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    // Log the raw response for debugging
    console.log('API Response status:', response.status);
    
    const responseText = await response.text();
    console.log('API Response body:', responseText);
    
    // Parse response text as JSON if possible
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse API response as JSON:', parseError);
      throw new Error(`API registration failed with status ${response.status}, response not valid JSON`);
    }
    
    if (!response.ok) {
      console.error('API registration failed with status:', response.status);
      console.error('Error details:', responseData);
      throw new Error(responseData?.message || `API registration failed with status ${response.status}`);
    }

    console.log('API registration successful:', responseData);
    return responseData;
  } catch (error) {
    console.error('API registration exception:', error);
    throw error;
  }
};

/**
 * Change password for current user
 * @param oldPassword Current password
 * @param newPassword New password
 * @returns Promise resolved when password is changed
 */
/**
 * Update user status after verification
 * @param cognitoId The Cognito user ID
 * @param token JWT token for authorization
 * @returns Promise resolved when status is updated
 */
export const updateUserStatus = async (cognitoId: string, token: string): Promise<any> => {
  const response = await fetch(`${api.baseUrl}/auth/users/status/${cognitoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      status: 'active'
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Failed to update user status with error ${response.status}`);
  }

  return response.json();
};

export const changePassword = (oldPassword: string, newPassword: string): Promise<void> => {
  const cognitoUser = userPool.getCurrentUser();

  if (!cognitoUser) {
    return Promise.reject(new Error("No current user"));
  }

  return new Promise((resolve, reject) => {
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err) {
        reject(err);
        return;
      }

      cognitoUser.changePassword(oldPassword, newPassword, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
};

/**
 * Request a password reset for a user
 * @param email User's email
 * @returns Promise resolved when the reset code is sent
 */
export const forgotPassword = (email: string): Promise<void> => {
  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: () => {
        resolve();
      },
      onFailure: (err) => {
        reject(err);
      }
    });
  });
};

/**
 * Confirm a password reset with verification code and new password
 * @param email User's email
 * @param verificationCode Code received from forgot password flow
 * @param newPassword New password to set
 * @returns Promise resolved when password is reset
 */
export const confirmForgotPassword = (
  email: string,
  verificationCode: string,
  newPassword: string
): Promise<void> => {
  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        resolve();
      },
      onFailure: (err) => {
        reject(err);
      }
    });
  });
};
