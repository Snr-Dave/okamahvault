import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  useEffect(() => {
    // Show welcome message after 3 seconds on first visit
    const timer = setTimeout(() => {
      if (!hasShownWelcome) {
        setHasShownWelcome(true);
        // You can add auto-open logic here if desired
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasShownWelcome]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={toggleChat}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        )}

        {isOpen && (
          <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Live Support</h3>
                <p className="text-sm opacity-90">We're here to help!</p>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 bg-gray-50">
              <div className="space-y-3">
                {/* Welcome Message */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      O
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">Hi! Need help with Okamah$Vesting?</p>
                      <p className="text-xs text-gray-500 mt-1">Typically replies in minutes</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 font-medium">Quick Help:</p>
                  <button className="w-full text-left bg-white p-2 rounded text-sm text-gray-700 hover:bg-purple-50 transition-colors">
                    How do investments work?
                  </button>
                  <button className="w-full text-left bg-white p-2 rounded text-sm text-gray-700 hover:bg-purple-50 transition-colors">
                    Referral program details
                  </button>
                  <button className="w-full text-left bg-white p-2 rounded text-sm text-gray-700 hover:bg-purple-50 transition-colors">
                    Withdrawal process
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm hover:from-purple-700 hover:to-blue-700 transition-all">
                  Send
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Start a conversation with our support team
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Welcome Notification (shows briefly) */}
      {hasShownWelcome && !isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-white rounded-lg shadow-lg p-3 border border-gray-200 max-w-xs animate-bounce">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              O
            </div>
            <p className="text-sm text-gray-800">Hi! Need help with Okamah$Vesting?</p>
          </div>
          <button
            onClick={() => setHasShownWelcome(false)}
            className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
          >
            <X className="h-3 w-3 text-gray-600" />
          </button>
        </div>
      )}
    </>
  );
};

export default LiveChat;