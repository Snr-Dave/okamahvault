import { MessageCircle, Clock, CheckCircle, HelpCircle, Shield } from 'lucide-react';

const Contact = () => {
  const faqItems = [
    {
      question: 'How do I start investing?',
      answer: 'Simply sign up, deposit SOL to our wallet address, and choose your investment amount. Our team will handle the rest.'
    },
    {
      question: 'What is the minimum investment?',
      answer: 'You can start investing with as little as $50 worth of SOL. There is no maximum limit.'
    },
    {
      question: 'How are returns calculated?',
      answer: 'Returns are calculated daily based on our trading performance, ranging from 2% to 3.5% per day over 7-day cycles.'
    },
    {
      question: 'When can I withdraw my funds?',
      answer: 'You can request withdrawals after your 7-day investment cycle completes. Processing typically takes 24-48 hours.'
    },
    {
      question: 'Is my investment secure?',
      answer: 'Yes, we use enterprise-grade security and all transactions are recorded on the Solana blockchain for transparency.'
    },
    {
      question: 'How does the referral program work?',
      answer: 'Share your referral link with friends. When they sign up and make their first deposit, you both receive $15 bonus.'
    }
  ];

  const supportFeatures = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Our support team is available around the clock to assist you'
    },
    {
      icon: MessageCircle,
      title: 'Instant Chat',
      description: 'Get immediate help through our live chat widget'
    },
    {
      icon: CheckCircle,
      title: 'Quick Resolution',
      description: 'Most issues are resolved within minutes of contact'
    },
    {
      icon: Shield,
      title: 'Secure Support',
      description: 'All support interactions are encrypted and secure'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Contact Support
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need help with your investment or have questions? Our dedicated support team is here to assist you 24/7.
          </p>
        </div>

        {/* Live Chat CTA */}
        <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white mb-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <MessageCircle className="h-48 w-48" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Get Instant Help</h2>
            <p className="text-indigo-100 text-lg mb-8">
              Click the chat widget in the bottom-right corner to start a conversation with our support team
            </p>
            
            <div className="bg-white bg-opacity-20 rounded-xl p-6 max-w-md mx-auto mb-6">
              <div className="flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 mr-3" />
                <span className="text-lg font-semibold">Live Chat Widget</span>
              </div>
              <p className="text-indigo-100 text-sm">
                "Hi! Need help with Okamah$Vesting?"
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">24/7</div>
                <div className="text-indigo-100">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">&lt; 2 min</div>
                <div className="text-indigo-100">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Expert</div>
                <div className="text-indigo-100">Support Team</div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-gradient-to-r from-indigo-100 to-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <div className="flex items-start mb-3">
                  <HelpCircle className="h-5 w-5 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-900">{item.question}</h4>
                </div>
                <p className="text-gray-600 ml-8">{item.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Don't see your question here? Our support team is ready to help!
            </p>
            <div className="bg-indigo-50 rounded-lg p-4 inline-block">
              <p className="text-indigo-800 font-medium">
                💬 Click the chat widget to get personalized assistance
              </p>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Chat Info */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Live Chat Support</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">Instant responses from real experts</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">Screen sharing for complex issues</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">Secure and encrypted conversations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">Available in multiple languages</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 text-center">
                Look for the chat bubble in the bottom-right corner of your screen
              </p>
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Help Topics</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left bg-white p-4 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
                <div className="font-medium text-gray-900">Account Setup & Verification</div>
                <div className="text-sm text-gray-600">Help with creating and verifying your account</div>
              </button>
              
              <button className="w-full text-left bg-white p-4 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
                <div className="font-medium text-gray-900">Investment Process</div>
                <div className="text-sm text-gray-600">Step-by-step guidance for making investments</div>
              </button>
              
              <button className="w-full text-left bg-white p-4 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
                <div className="font-medium text-gray-900">Withdrawal Requests</div>
                <div className="text-sm text-gray-600">How to request and track your withdrawals</div>
              </button>
              
              <button className="w-full text-left bg-white p-4 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
                <div className="font-medium text-gray-900">Referral Program</div>
                <div className="text-sm text-gray-600">Maximize your earnings through referrals</div>
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Click any topic above to start a focused chat session
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;