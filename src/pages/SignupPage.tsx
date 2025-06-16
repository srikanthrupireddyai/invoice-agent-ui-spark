import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { signUp, SignUpParams } from "@/services/authService";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    invoicesPerMonth: "",
    invoicingPlatform: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.businessName || !formData.email || !formData.password || !formData.businessType || !formData.invoicesPerMonth) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const signUpParams: SignUpParams = {
        email: formData.email,
        password: formData.password,
        businessName: formData.businessName,
        businessType: formData.businessType,
        invoicesPerMonth: formData.invoicesPerMonth,
        firstName: formData.firstName,
        lastName: formData.lastName
      };
      
      // Register with Cognito
      const result = await signUp(signUpParams);
      
      // Store the email so we can use it for verification
      sessionStorage.setItem('userEmail', formData.email);
      
      toast({
        title: "Account Created Successfully!",
        description: "Please check your email for verification code.",
      });
      
      // Navigate to verification page after a short delay
      setTimeout(() => {
        navigate("/verify-account");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      
      let errorMessage = "Failed to create account. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("An account with the given email already exists")) {
          errorMessage = "An account with this email already exists. Please try signing in.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Signup Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </nav>
      </header>

      {/* Signup Form */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <CardDescription>
                Get started with automated invoice follow-ups in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your Business Name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Business Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@business.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Type of Business</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange("businessType", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole_proprietor">Sole Proprietor</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="freelancing">Freelancing</SelectItem>
                      <SelectItem value="service_provider">Service Provider</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoicesPerMonth">Invoices Per Month</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange("invoicesPerMonth", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Estimated monthly invoices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 invoices</SelectItem>
                      <SelectItem value="11-25">11-25 invoices</SelectItem>
                      <SelectItem value="26-50">26-50 invoices</SelectItem>
                      <SelectItem value="50+">50+ invoices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoicingPlatform">Primary Invoicing Platform</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange("invoicingPlatform", value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your invoicing platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quickbooks">QuickBooks Online</SelectItem>
                      <SelectItem value="zoho">Zoho Invoice</SelectItem>
                      <SelectItem value="freshbooks">FreshBooks</SelectItem>
                      <SelectItem value="manual">Manual/Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </div>

                <div className="text-center text-sm text-gray-600">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
