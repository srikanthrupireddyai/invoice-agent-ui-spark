
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const IntegrationManagement = () => {
  const [integrations, setIntegrations] = useState([
    { id: "quickbooks", name: "QuickBooks Online", connected: false, status: "Not Connected" },
    { id: "zoho", name: "Zoho Invoice", connected: true, status: "Connected", lastSync: "2 hours ago" },
    { id: "freshbooks", name: "FreshBooks", connected: false, status: "Not Connected" },
    { id: "xero", name: "Xero", connected: false, status: "Not Connected" }
  ]);

  const { toast } = useToast();

  const handleConnect = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(int => 
        int.id === integrationId 
          ? { ...int, connected: true, status: "Connected", lastSync: "Just now" }
          : int
      )
    );
    
    toast({
      title: "Integration Connected",
      description: "Successfully connected to your invoicing platform.",
    });
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(int => 
        int.id === integrationId 
          ? { ...int, connected: false, status: "Not Connected", lastSync: undefined }
          : int
      )
    );
    
    toast({
      title: "Integration Disconnected",
      description: "Platform has been disconnected from your account.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Integrations</CardTitle>
          <CardDescription>
            Connect your invoicing platforms to automatically track overdue invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {integration.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{integration.name}</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      {integration.connected ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Connected</span>
                          {integration.lastSync && (
                            <span>• Last sync: {integration.lastSync}</span>
                          )}
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-gray-400" />
                          <span>Not Connected</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={integration.connected ? "default" : "secondary"}
                    className={integration.connected ? "bg-green-100 text-green-800" : ""}
                  >
                    {integration.status}
                  </Badge>
                  
                  {integration.connected ? (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => handleConnect(integration.id)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration Help</CardTitle>
          <CardDescription>
            Need help setting up your integrations?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Quick Setup Guide</h4>
              <p className="text-sm text-blue-700 mt-1">
                Click "Connect" next to your invoicing platform and follow the OAuth authorization flow. 
                Your invoice data will be synced automatically within minutes.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline">View Documentation</Button>
              <Button variant="outline">Contact Support</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
