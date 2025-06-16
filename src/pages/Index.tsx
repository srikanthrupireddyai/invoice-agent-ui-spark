
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DollarSign, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">InvoiceAgent</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Automated Invoice Follow-Up
            <span className="text-blue-600"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let our AI agent handle your overdue invoices automatically. Connect your invoicing platform, 
            set your preferences, and watch your cash flow improve.
          </p>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link to="/signup">Start Free Trial</Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Automated Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Intelligent reminders sent at optimal intervals to maximize payment collection.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Professional Messaging</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                AI-generated, professional messages that maintain good client relationships.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Platform Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Seamlessly connects with QuickBooks, Zoho Invoice, FreshBooks, and more.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Cash Flow?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of small businesses already using InvoiceAgent
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Sign Up Now</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
