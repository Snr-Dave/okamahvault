import { Users, Gift, Share2, DollarSign, Copy, Trophy, Star } from 'lucide-react';
import { useState } from 'react';

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const exampleCode = "REF123456";
  const exampleLink = `https://okamahvesting.com/signup?ref=${exampleCode}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: '$15 Instant Bonus',
      description: 'Both you and your friend receive $15 immediately upon signup'
    },
    {
      icon: Users,
      title: 'Unlimited Referrals',
      description: 'No limit on how many friends you can refer and earn from'
    },
    {
      icon: Gift,
      title: 'Welcome Bonus',
      description: 'Your friends get $15 welcome bonus to start investing right away'
    },
    {
      icon: Trophy,
      title: 'VIP Status',
      description: 'Top referrers get exclusive benefits and higher return rates'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Get Your Link',
      description: 'Sign up and receive your unique referral code and link'
    },
    {
      number: 2,
      title: 'Share with Friends',
      description: 'Send your referral link via social media, email, or messaging'
    },
    {
      number: 3,
      title: 'Friend Signs Up',
      description: 'Your friend creates an account using your referral link'
    },
    {
      number: 4,
      title: 'Both Earn $15',
      description: 'You and your friend both receive $15 bonus instantly'
    }
  ];

  const tierRewards = [
    {
      tier: 'Bronze',
      referrals: '1-5',
      bonus: '$15',
      color: 'from-amber-600 to-amber-800'
    },
    {
      tier: 'Silver',
      referrals: '6-15',
      bonus: '$20',
      color: 'from-gray-400 to-gray-600'
    },
    {
      tier: 'Gold',
      referrals: '16-50',
      bonus: '$25',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      tier: 'Platinum',
      referrals: '51+',
      bonus: '$30',
      color: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Referral Program
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Invite friends to Okamah$Vesting and earn $15 for every successful referral. 
            The more you share, the more you earn!
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Gift className="h-48 w-48" />
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-4">Earn $15 Per Referral</h2>
            <p className="text-purple-100 text-lg mb-8">
              Share the opportunity and get rewarded instantly when your friends join
            </p>
            
            {/* Sample Referral Code Box */}
            <div className="bg-white bg-opacity-20 rounded-xl p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">Your Referral Code</h3>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-mono text-lg font-bold">{exampleCode}</span>
                  <button
                    onClick={() => handleCopy(exampleCode)}
                    className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    {copied ? 'Copied!' : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 text-sm font-medium truncate mr-2">{exampleLink}</span>
                  <button
                    onClick={() => handleCopy(exampleLink)}
                    className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors flex-shrink-0"
                  >
                    {copied ? 'Copied!' : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <a
                href="/dashboard"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center"
              >
                Get Your Referral Link
                <Share2 className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How Referrals Work</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {step.number}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier Rewards */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Referral Tiers & Rewards</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tierRewards.map((tier, index) => (
              <div key={index} className="text-center">
                <div className={`bg-gradient-to-r ${tier.color} rounded-xl p-6 text-white mb-4`}>
                  <Star className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="text-xl font-bold">{tier.tier}</h4>
                  <p className="text-sm opacity-90">{tier.referrals} referrals</p>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{tier.bonus}</div>
                <div className="text-gray-600">per referral</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Higher tiers unlock increased referral bonuses and exclusive benefits
            </p>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Success Stories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-700 font-medium">Referrals Made</div>
              <div className="text-gray-600 text-sm">by Sarah M.</div>
              <div className="text-green-600 font-semibold mt-1">$4,500 Earned</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">89+</div>
              <div className="text-gray-700 font-medium">Friends Invited</div>
              <div className="text-gray-600 text-sm">by Mike T.</div>
              <div className="text-blue-600 font-semibold mt-1">$2,225 Earned</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">67+</div>
              <div className="text-gray-700 font-medium">Active Referrals</div>
              <div className="text-gray-600 text-sm">by Lisa K.</div>
              <div className="text-purple-600 font-semibold mt-1">$1,675 Earned</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Earning?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Join our referral program today and start earning $15 for every friend you invite.
          </p>
          <a
            href="/dashboard"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            Start Referring Friends
            <Users className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Referral;