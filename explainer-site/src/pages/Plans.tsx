import { TrendingUp, Clock, DollarSign, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Plans = () => {
  const [animatedValues, setAnimatedValues] = useState({
    dailyROI: 0,
    weeklyReturn: 0,
    totalReturn: 0
  });

  // Animate numbers on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        dailyROI: 2.8,
        weeklyReturn: 19.6,
        totalReturn: 119.6
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const planFeatures = [
    '7-day investment cycle',
    '2% minimum daily ROI',
    'Up to 3.5% maximum daily ROI',
    'Automatic reinvestment option',
    'Secure Solana blockchain',
    'Real-time profit tracking',
    'No hidden fees',
    'Professional management',
    'Instant withdrawal requests',
    '24/7 customer support'
  ];

  const exampleCalculations = [
    {
      investment: 100,
      dailyRate: 2.0,
      weeklyProfit: 14,
      totalReturn: 114
    },
    {
      investment: 500,
      dailyRate: 2.5,
      weeklyProfit: 87.5,
      totalReturn: 587.5
    },
    {
      investment: 1000,
      dailyRate: 3.0,
      weeklyProfit: 210,
      totalReturn: 1210
    },
    {
      investment: 5000,
      dailyRate: 3.5,
      weeklyProfit: 1225,
      totalReturn: 6225
    }
  ];

  const CompoundGrowthChart = () => {
    const [currentCycle, setCurrentCycle] = useState(0);
    const cycles = 4;
    const initialAmount = 1000;
    const dailyRate = 0.025; // 2.5%
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentCycle(prev => (prev + 1) % (cycles + 1));
      }, 2000);
      
      return () => clearInterval(interval);
    }, []);

    const calculateAmount = (cycle: number) => {
      let amount = initialAmount;
      for (let i = 0; i < cycle; i++) {
        amount = amount * (1 + (dailyRate * 7)); // 7 days at daily rate
      }
      return amount;
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Compound Growth Example</h3>
        <div className="space-y-3">
          {Array.from({ length: cycles + 1 }, (_, i) => (
            <div
              key={i}
              className={`flex justify-between items-center p-3 rounded-lg transition-all duration-500 ${
                i <= currentCycle ? 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200' : 'bg-gray-50'
              }`}
            >
              <span className="font-medium">
                {i === 0 ? 'Initial Investment' : `After Cycle ${i}`}
              </span>
              <span className={`font-bold ${i <= currentCycle ? 'text-green-600' : 'text-gray-400'}`}>
                ${calculateAmount(i).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4 text-sm text-gray-600">
          Reinvesting profits compounds your returns
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Investment Plans
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our flexible 7-day investment cycles offer consistent returns with the option to reinvest for compound growth.
          </p>
        </div>

        {/* Main Plan Card */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 opacity-10">
            <TrendingUp className="h-48 w-48" />
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">7-Day Investment Cycle</h2>
              <p className="text-blue-100 text-lg">Professional Solana investment management with guaranteed returns</p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 transition-all duration-1000">
                  {animatedValues.dailyROI.toFixed(1)}%
                </div>
                <div className="text-blue-100">Average Daily ROI</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 transition-all duration-1000">
                  {animatedValues.weeklyReturn.toFixed(1)}%
                </div>
                <div className="text-blue-100">Weekly Return</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 transition-all duration-1000">
                  {animatedValues.totalReturn.toFixed(1)}%
                </div>
                <div className="text-blue-100">Total Return</div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/dashboard"
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
              >
                Start Investing Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Plan Features</h3>
            <div className="space-y-3">
              {planFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <CompoundGrowthChart />
        </div>

        {/* Investment Calculator */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Investment Calculator</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Investment Amount</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Daily Rate</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Weekly Profit</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Total Return</th>
                </tr>
              </thead>
              <tbody>
                {exampleCalculations.map((calc, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-blue-600">${calc.investment}</td>
                    <td className="py-4 px-4 text-green-600">{calc.dailyRate}%</td>
                    <td className="py-4 px-4 text-purple-600">${calc.weeklyProfit}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">${calc.totalReturn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600 mb-4">
              *Returns are calculated based on our performance history and market conditions
            </p>
          </div>
        </div>

        {/* How It Works Timeline */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Investment Timeline</h3>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Day 0</h4>
              <p className="text-gray-600 text-sm">Investment Start</p>
            </div>
            
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Days 1-7</h4>
              <p className="text-gray-600 text-sm">Daily Returns</p>
            </div>
            
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Day 7</h4>
              <p className="text-gray-600 text-sm">Cycle Complete</p>
            </div>
            
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Day 8+</h4>
              <p className="text-gray-600 text-sm">Withdraw or Reinvest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;