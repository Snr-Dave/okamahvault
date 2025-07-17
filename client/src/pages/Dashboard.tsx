import StatsCard from "@/components/StatsCard";
import { TrendingUp, Wallet, Users, BarChart3, ArrowUp, Gift, CreditCard, ExternalLink, Upload, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Dashboard = () => {
  const { toast } = useToast();
  const [depositData, setDepositData] = useState({
    transactionId: "",
    amount: "",
    screenshotFile: null as File | null,
  });
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
    walletAddress: "",
  });

  const SOLANA_WALLET = "HxDWxdDWoMUErQ3Y3JdiVd9xi23UU9V8fjvbqwkEaurT";

  const recentTransactions = [
    {
      type: "Investment Purchase",
      date: "2 hours ago",
      amount: "+$250.00",
      icon: ArrowUp,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      type: "Referral Bonus",
      date: "1 day ago",
      amount: "+$15.00",
      icon: Gift,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      type: "Wallet Deposit",
      date: "3 days ago",
      amount: "+$100.00",
      icon: CreditCard,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Solana wallet address copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

  const handleDepositSubmit = async () => {
    if (!depositData.transactionId || !depositData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // TODO: Upload screenshot and get URL
      const screenshotUrl = depositData.screenshotFile ? "https://example.com/screenshot.jpg" : undefined;
      
      const response = await fetch("/api/submit-deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // TODO: Get from auth context
          transactionId: depositData.transactionId,
          amount: parseFloat(depositData.amount),
          screenshotUrl,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Deposit Submitted",
          description: "Your deposit is pending admin approval",
        });
        setDepositData({ transactionId: "", amount: "", screenshotFile: null });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Deposit Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleInvestment = async () => {
    if (!investmentAmount) {
      toast({
        title: "Missing Amount",
        description: "Please enter investment amount",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // TODO: Get from auth context
          amount: parseFloat(investmentAmount),
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Investment Started",
          description: `Your investment of $${investmentAmount} is now active with ${data.investment.roiPercent}% daily ROI`,
        });
        setInvestmentAmount("");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Investment Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleWithdrawalRequest = async () => {
    if (!withdrawalData.amount || !withdrawalData.walletAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/request-withdrawal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // TODO: Get from auth context
          amount: parseFloat(withdrawalData.amount),
          walletAddress: withdrawalData.walletAddress,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Withdrawal Requested",
          description: "Your withdrawal request is pending admin approval",
        });
        setWithdrawalData({ amount: "", walletAddress: "" });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to Okamah$Vesting Dashboard</h1>
        <p className="opacity-90">Manage your investments and track your portfolio performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Portfolio Value"
          value="$12,450.00"
          icon={TrendingUp}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          change="+12.5%"
          changeType="positive"
          subtitle="vs last month"
        />
        
        <StatsCard
          title="Wallet Balance"
          value="$15.00"
          icon={Wallet}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
          subtitle="Signup Bonus Applied"
        />
        
        <StatsCard
          title="Referrals"
          value="3"
          icon={Users}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
          change="+$45 earned"
          changeType="positive"
        />
        
        <StatsCard
          title="Active Investments"
          value="8"
          icon={BarChart3}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="2 new this week"
        />
      </div>

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Portfolio Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Portfolio Performance</h3>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">Chart Component Placeholder</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => {
              const Icon = transaction.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${transaction.iconBg}`}>
                      <Icon className={`w-4 h-4 ${transaction.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{transaction.type}</p>
                      <p className="text-sm text-slate-500">{transaction.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-900">{transaction.amount}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Investment Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Deposit Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
              Fund Your Account
            </CardTitle>
            <CardDescription>Send SOL to fund your investment account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-slate-700">Send SOL to this address:</Label>
              <div className="flex items-center mt-2 space-x-2">
                <code className="text-xs bg-white p-2 rounded border break-all flex-1">
                  {SOLANA_WALLET}
                </code>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(SOLANA_WALLET)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="txId">Transaction ID</Label>
                <Input
                  id="txId"
                  placeholder="Paste transaction ID here"
                  value={depositData.transactionId}
                  onChange={(e) => setDepositData({...depositData, transactionId: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={depositData.amount}
                  onChange={(e) => setDepositData({...depositData, amount: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="screenshot">Screenshot Proof (Optional)</Label>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDepositData({...depositData, screenshotFile: e.target.files?.[0] || null})}
                />
              </div>
              
              <Button onClick={handleDepositSubmit} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Submit Deposit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Investment Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Start Investment
            </CardTitle>
            <CardDescription>Invest with 2-3.5% daily ROI for 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-800 font-medium">Investment Terms:</div>
              <ul className="text-xs text-green-700 mt-1 space-y-1">
                <li>• Daily ROI: 2.0% - 3.5%</li>
                <li>• Investment Period: 7 days</li>
                <li>• Minimum: $10</li>
                <li>• Maximum: $10,000</li>
              </ul>
            </div>
            
            <div>
              <Label htmlFor="investAmount">Investment Amount (USD)</Label>
              <Input
                id="investAmount"
                type="number"
                placeholder="0.00"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
            </div>
            
            <Button onClick={handleInvestment} className="w-full bg-green-600 hover:bg-green-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Start Investment
            </Button>
          </CardContent>
        </Card>

        {/* Withdrawal Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-orange-600" />
              Request Withdrawal
            </CardTitle>
            <CardDescription>Withdraw profits or capital to your wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-orange-800 font-medium">Available Balance:</div>
              <div className="text-xl font-bold text-orange-900">$15.00</div>
              <div className="text-xs text-orange-700">+ Any completed investment profits</div>
            </div>
            
            <div>
              <Label htmlFor="withdrawAmount">Withdrawal Amount (USD)</Label>
              <Input
                id="withdrawAmount"
                type="number"
                placeholder="0.00"
                value={withdrawalData.amount}
                onChange={(e) => setWithdrawalData({...withdrawalData, amount: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="walletAddress">Your Solana Wallet Address</Label>
              <Input
                id="walletAddress"
                placeholder="Enter your Solana wallet address"
                value={withdrawalData.walletAddress}
                onChange={(e) => setWithdrawalData({...withdrawalData, walletAddress: e.target.value})}
              />
            </div>
            
            <Button onClick={handleWithdrawalRequest} className="w-full bg-orange-600 hover:bg-orange-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Request Withdrawal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Solana Network Status */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Network Information</h3>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Mainnet Active
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">Network</p>
            <p className="text-sm font-medium text-slate-900">Solana Mainnet</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">Processing Time</p>
            <p className="text-sm font-medium text-slate-900">24-48 Hours</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">Status</p>
            <p className="text-sm font-medium text-green-600">Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
