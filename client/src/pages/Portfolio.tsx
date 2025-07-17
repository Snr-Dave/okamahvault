import { TrendingUp, DollarSign, Calendar, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";

const Portfolio = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Portfolio</h1>
        <p className="text-slate-600">Track your investment performance and holdings</p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Portfolio Value"
          value="$12,450.00"
          icon={DollarSign}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          change="+12.5%"
          changeType="positive"
          subtitle="vs last month"
        />
        
        <StatsCard
          title="Active Investments"
          value="8"
          icon={TrendingUp}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
          subtitle="Currently running"
        />
        
        <StatsCard
          title="Total Profit"
          value="$2,450.00"
          icon={Activity}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
          change="+8.2%"
          changeType="positive"
          subtitle="All time"
        />
        
        <StatsCard
          title="Avg. Daily ROI"
          value="2.8%"
          icon={Calendar}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Last 30 days"
        />
      </div>

      {/* Portfolio Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
            <CardDescription>Your portfolio growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600">Portfolio performance chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Investments</CardTitle>
            <CardDescription>Your current investment positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600">Your investment portfolio will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;