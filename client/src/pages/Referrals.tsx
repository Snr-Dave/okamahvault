import { Users, Share2, Gift, Copy, User, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import StatsCard from "@/components/StatsCard";

const Referrals = () => {
  const { toast } = useToast();
  
  const referralCode = "REF123456";
  const referralLink = `https://okamahvesting.com/signup?ref=${referralCode}`;
  
  const referralHistory = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2024-01-15",
      bonus: "$15.00",
      status: "active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2024-01-12",
      bonus: "$15.00",
      status: "active"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      joinDate: "2024-01-10",
      bonus: "$15.00",
      status: "active"
    },
  ];

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Referrals</h1>
        <p className="text-slate-600">Invite friends and earn $15 for each successful referral</p>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Referrals"
          value="3"
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="All time"
        />
        
        <StatsCard
          title="Total Earned"
          value="$45.00"
          icon={DollarSign}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
          subtitle="Referral bonuses"
        />
        
        <StatsCard
          title="This Month"
          value="2"
          icon={User}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
          subtitle="New referrals"
        />
        
        <StatsCard
          title="Pending"
          value="0"
          icon={Gift}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Awaiting signup"
        />
      </div>

      {/* Referral Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Share Your Link */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="w-5 h-5 mr-2 text-blue-600" />
              Share Your Referral Link
            </CardTitle>
            <CardDescription>Earn $15 for each friend who signs up</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Gift className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-800">Referral Bonus</p>
                  <p className="text-xs text-green-600">You and your friend both get $15 when they sign up</p>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="referralCode">Your Referral Code</Label>
              <div className="flex mt-2">
                <Input
                  id="referralCode"
                  value={referralCode}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  className="ml-2"
                  onClick={() => copyToClipboard(referralCode, "Referral code")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="referralLink">Your Referral Link</Label>
              <div className="flex mt-2">
                <Input
                  id="referralLink"
                  value={referralLink}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  className="ml-2"
                  onClick={() => copyToClipboard(referralLink, "Referral link")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How Referrals Work</CardTitle>
            <CardDescription>Simple steps to earn referral bonuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Share Your Link</h4>
                  <p className="text-sm text-slate-600">Send your unique referral link to friends</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Friend Signs Up</h4>
                  <p className="text-sm text-slate-600">They create an account using your link</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Both Earn $15</h4>
                  <p className="text-sm text-slate-600">You and your friend both receive $15 bonus</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 text-center">
                Invite friends and earn bonuses will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
          <CardDescription>People who joined using your referral link</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referralHistory.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{referral.name}</p>
                    <p className="text-sm text-slate-600">{referral.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{referral.bonus}</p>
                  <p className="text-sm text-slate-600">{referral.joinDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Referrals;