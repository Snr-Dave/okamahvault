import StatsCard from "@/components/StatsCard";
import { TrendingUp, Wallet, Users, BarChart3, ArrowUp, Gift, CreditCard, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
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

      {/* Solana Wallet Integration */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Solana Wallet</h3>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ExternalLink className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">SOL Balance</p>
            <p className="text-xl font-bold text-slate-900">0.00 SOL</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">Wallet Address</p>
            <p className="text-sm font-mono text-slate-900">Not Connected</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">Network</p>
            <p className="text-sm font-medium text-slate-900">Mainnet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
