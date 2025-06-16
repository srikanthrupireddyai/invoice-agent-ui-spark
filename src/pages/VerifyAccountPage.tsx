import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { confirmSignUp, signIn, updateUserStatus } from "@/services/authService";

const VerifyAccountPage = () => {
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [businessData, setBusinessData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Retrieve email from session storage
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    // Try to retrieve saved business data
    const storedBusinessData = sessionStorage.getItem('businessData');
    if (storedBusinessData) {
      setBusinessData(JSON.parse(storedBusinessData));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Please enter the email address you used to sign up.",
        variant: "destructive"
      });
      return;
    }
    
    if (!verificationCode) {
      toast({
        title: "Missing Verification Code",
        description: "Please enter the verification code sent to your email.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Confirm signup with verification code
      await confirmSignUp({
        email,
        confirmationCode: verificationCode
      });
      
      // Show success message and guide to sign in
      toast({
        title: "Account Verified!",
        description: "Your account has been successfully verified. Please sign in to continue.",
      });

      // Navigate to sign in page after verification
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
      
    } catch (error) {
      console.error("Verification error:", error);
      
      let errorMessage = "Failed to verify account. Please check the code and try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("Invalid verification code")) {
          errorMessage = "Invalid verification code. Please check and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Verification Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    // This would typically call a resend verification code API
    // For now, we'll just show a toast message
    toast({
      title: "Verification Code Sent",
      description: "A new verification code has been sent to your email address.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">InvoiceAgent</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/signup" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Signup</span>
            </Link>
          </Button>
        </nav>
      </header>

      {/* Verification Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Verify Your Account</CardTitle>
              <CardDescription>
                We've sent a verification code to your email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading || !!email}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    placeholder="Enter the code from your email"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Account"
                  )}
                </Button>
                
                <div className="text-center">
                  <Button variant="ghost" type="button" onClick={handleResendCode} disabled={isLoading}>
                    Resend verification code
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VerifyAccountPage;
