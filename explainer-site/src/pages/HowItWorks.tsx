import { Wallet, TrendingUp, ArrowRight, RotateCcw, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Wallet,
      title: 'Deposit SOL',
      description: 'Transfer your Solana (SOL) to our secure platform using your wallet address',
      details: [
        'Copy our Solana wallet address',
        'Send SOL from your wallet',
        'Upload transaction screenshot',
        'Funds credited within minutes'
      ]
    },
    {
      number: 2,
      icon: TrendingUp,
      title: '7-Day Investment',
      description: 'Your SOL is invested in our high-yield programs for exactly 7 days',
      details: [
        'Choose investment amount',
        'Automatic investment activation',
        'Track daily progress',
        'Professional portfolio management'
      ]
    },
    {
      number: 3,
      icon: DollarSign,
      title: 'Earn 2–3.5% Daily ROI',
      description: 'Watch your investment grow with guaranteed daily returns',
      details: [
        '2% minimum daily return',
        'Up to 3.5% maximum daily return',
        'Transparent profit tracking',
        'Real-time balance updates'
      ]
    },
    {
      number: 4,
      icon: ArrowRight,
      title: 'Withdraw or Reinvest',
      description: 'After 7 days, choose to withdraw profits or reinvest for compound growth',
      details: [
        'Withdraw principal + profits',
        'Reinvest for compound returns',
        'Partial withdrawal options',
        'Fast processing times'
      ]
    }
  ];

  const benefits = [
    'No hidden fees or charges',
    'Transparent investment tracking',
    'Professional risk management',
    'Secure blockchain technology',
    '24/7 customer support',
    'Instant profit calculations'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process makes investing in Solana easy and profitable. 
            Start earning daily returns in just minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div key={step.number} className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {step.number}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                  </div>
                  
                  <p className="text-xl text-gray-600 mb-6">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center justify-center lg:justify-start">
                        <ArrowRight className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="h-24 w-24 text-purple-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Flow */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Investment Cycle</h3>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Wallet className="h-8 w-8 text-blue-600" />
              </div>
              <p className="font-semibold">Deposit</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <p className="font-semibold">7 Days</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <p className="font-semibold">Profit</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <RotateCcw className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="font-semibold">Repeat</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Platform?</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ArrowRight className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-4">Ready to Get Started?</h4>
            <p className="mb-6">Join thousands of investors already earning daily returns with Okamah$Vesting.</p>
            <a
              href="/dashboard"
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center"
            >
              Start Investing
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;