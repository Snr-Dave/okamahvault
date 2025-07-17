import { Wallet, CreditCard, ArrowUp, ArrowDown, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/StatsCard";

const WalletPage = () => {
  const recentTransactions = [
    {
      id: 1,
      type: "deposit",
      amount: "$500.00",
      status: "completed",
      date: "2024-01-15",
      description: "SOL deposit",
      icon: ArrowUp,
      iconColor: "text-green-600",
      iconBg: "bg-green-50"
    },
    {
      id: 2,
      type: "investment",
      amount: "$250.00",
      status: "active",
      date: "2024-01-14",
      description: "7-day investment",
      icon: ArrowUp,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50"
    },
    {
      id: 3,
      type: "withdrawal",
      amount: "$100.00",
      status: "pending",
      date: "2024-01-13",
      description: "Withdrawal request",
      icon: ArrowDown,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50"
    },
    {
      id: 4,
      type: "referral",
      amount: "$15.00",
      status: "completed",
      date: "2024-01-12",
      description: "Referral bonus",
      icon: CheckCircle,
      iconColor: "text-green-600",
      iconBg: "bg-green-50"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "active":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Active</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Wallet</h1>
        <p className="text-slate-600">Manage your balance and view transaction history</p>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Available Balance"
          value="$15.00"
          icon={Wallet}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="Available for investment"
        />
        
        <StatsCard
          title="Total Deposited"
          value="$1,500.00"
          icon={ArrowUp}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
          subtitle="All time deposits"
        />
        
        <StatsCard
          title="Total Withdrawn"
          value="$750.00"
          icon={ArrowDown}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="All time withdrawals"
        />
        
        <StatsCard
          title="Pending Requests"
          value="2"
          icon={Clock}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
          subtitle="Awaiting processing"
        />
      </div>

      {/* Wallet Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Balance Overview</CardTitle>
            <CardDescription>Your current wallet status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-slate-900">Available Balance</p>
                    <p className="text-sm text-slate-600">Ready for investment</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">$15.00</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-slate-900">In Investments</p>
                    <p className="text-sm text-slate-600">Currently invested</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">$2,000.00</p>
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">Your wallet balance and transactions will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest wallet activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => {
                const Icon = transaction.icon;
                return (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${transaction.iconBg}`}>
                        <Icon className={`w-4 h-4 ${transaction.iconColor}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{transaction.description}</p>
                        <p className="text-sm text-slate-600">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{transaction.amount}</p>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;