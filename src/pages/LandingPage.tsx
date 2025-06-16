import { Button } from "@/components/ui/button";
import { DollarSign, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">InvoiceAgent</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Automate Your Invoice Reminders
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Save time and improve cash flow with AI-powered invoice reminders. 
          Connect your accounting software and let our agents handle the follow-ups.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Button size="lg" asChild className="h-12 px-8">
            <Link to="/signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Smart Invoice Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <CheckCircle className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Automated Reminders</h3>
              <p className="text-gray-600">
                Set up custom reminder schedules and let our system handle all follow-ups automatically.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <CheckCircle className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Zoho Integration</h3>
              <p className="text-gray-600">
                Seamlessly connect with your Zoho Invoice account to sync all your invoice data.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <CheckCircle className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Tracking</h3>
              <p className="text-gray-600">
                Monitor payment status and get insights on your cash flow and outstanding invoices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <DollarSign className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">InvoiceAgent</span>
            </div>
            <div className="flex flex-wrap gap-8">
              <Link to="/signin" className="hover:text-blue-400 transition-colors">Sign In</Link>
              <Link to="/signup" className="hover:text-blue-400 transition-colors">Sign Up</Link>
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} InvoiceAgent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
