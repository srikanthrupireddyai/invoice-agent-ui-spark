
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export const MessageTemplates = () => {
  const [templates, setTemplates] = useState({
    first: `Hi [CLIENT_NAME],

I hope this message finds you well. I wanted to reach out regarding invoice [INVOICE_NUMBER] for [AMOUNT], which was due on [DUE_DATE].

I understand that sometimes invoices can slip through the cracks, so I wanted to send a friendly reminder. If you've already processed this payment, please disregard this message.

If you have any questions about this invoice or need any additional information, please don't hesitate to reach out.

Thank you for your business!

Best regards,
[BUSINESS_NAME]`,
    
    second: `Hi [CLIENT_NAME],

I hope you're doing well. I'm following up on invoice [INVOICE_NUMBER] for [AMOUNT], which is now [DAYS_OVERDUE] days past due.

I wanted to check if there are any issues with this invoice or if you need any additional information from me to process the payment.

If you could let me know the status or expected payment date, I would greatly appreciate it.

Thank you for your attention to this matter.

Best regards,
[BUSINESS_NAME]`,
    
    final: `Hi [CLIENT_NAME],

I'm writing to follow up on invoice [INVOICE_NUMBER] for [AMOUNT], which is now [DAYS_OVERDUE] days overdue.

This is my final reminder before this matter is escalated. I value our business relationship and would prefer to resolve this directly.

Please contact me immediately to discuss payment arrangements or if there are any disputes regarding this invoice.

I look forward to your prompt response.

Best regards,
[BUSINESS_NAME]`
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Templates Saved",
      description: "Your message templates have been updated successfully.",
    });
  };

  const templateInfo = [
    { key: "first", name: "First Reminder", days: "3 days overdue", tone: "Friendly" },
    { key: "second", name: "Second Reminder", days: "10 days overdue", tone: "Professional" },
    { key: "final", name: "Final Notice", days: "20 days overdue", tone: "Firm" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Message Templates</CardTitle>
          <CardDescription>
            Customize the automated messages sent to clients with overdue invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h4 className="font-medium mb-2">Available Variables</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "[CLIENT_NAME]",
                "[INVOICE_NUMBER]", 
                "[AMOUNT]",
                "[DUE_DATE]",
                "[DAYS_OVERDUE]",
                "[BUSINESS_NAME]"
              ].map((variable) => (
                <Badge key={variable} variant="outline" className="text-xs">
                  {variable}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              These variables will be automatically replaced with actual values when messages are sent.
            </p>
          </div>

          <Tabs defaultValue="first" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              {templateInfo.map((template) => (
                <TabsTrigger key={template.key} value={template.key}>
                  <div className="text-center">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.days}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {templateInfo.map((template) => (
              <TabsContent key={template.key} value={template.key}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.tone} Tone</Badge>
                    </div>
                    <CardDescription>
                      Sent automatically {template.days}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={templates[template.key as keyof typeof templates]}
                      onChange={(e) => setTemplates({
                        ...templates,
                        [template.key]: e.target.value
                      })}
                      rows={12}
                      className="font-mono text-sm"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave}>Save Templates</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
