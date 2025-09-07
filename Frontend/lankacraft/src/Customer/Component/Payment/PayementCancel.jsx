import { memo, useState, useEffect } from 'react';
import { X, AlertCircle, CreditCard, Phone, Mail, RefreshCw, ArrowLeft, Package } from 'lucide-react';

const PaymentCancel = () => {
  const [order_id] = useState('ORD_' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  const brandColor = 'rgb(125, 47, 9)';

  const commonReasons = [
    'Insufficient funds',
    'Card declined',
    'Network timeout',
    'Incorrect card details',
    'Payment method not supported',
    'Other reason'
  ];

  const handleRetryPayment = () => {
    // Redirect to payment page
    window.location.href = '/checkout/payment';
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleContactSupport = () => {
    // You can integrate with your support system
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-red-100">
        
        {/* Error Animation */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-1000 bg-red-500 ${
            showAnimation ? 'scale-100 rotate-0' : 'scale-50 rotate-180'
          }`}>
            <X className="w-10 h-10 text-white" />
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${
            showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Unsuccessful</h1>
            <div className="text-lg text-gray-700 leading-relaxed mb-6">
              <p className="mb-2">😔 <strong>We couldn't process your payment</strong></p>
              <p className="text-base">
                Don't worry! Your <span className="font-semibold">Sri Lankan handicraft items</span> are 
                still waiting for you. Let's try again.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className={`mb-8 transition-all duration-1000 delay-500 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <div className="flex items-center mb-3">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="font-semibold text-gray-800">Transaction Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Order ID:</span>
                <p className="font-mono font-semibold">{order_id}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="font-semibold text-red-600">Failed</p>
              </div>
              <div>
                <span className="text-gray-600">Time:</span>
                <p className="font-semibold">{new Date().toLocaleTimeString()}</p>
              </div>
              <div>
                <span className="text-gray-600">Amount:</span>
                <p className="font-bold" style={{ color: brandColor }}>LKR 4,850.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Possible Reasons */}
        <div className={`mb-8 transition-all duration-1000 delay-700 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" style={{ color: brandColor }} />
            Common reasons for payment failure:
          </h3>
          
          <div className="space-y-2">
            {commonReasons.map((reason, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="failure-reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="text-orange-600"
                  style={{ accentColor: brandColor }}
                />
                <span className="text-gray-700">{reason}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-3 mb-6 transition-all duration-1000 delay-900 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button 
            onClick={handleRetryPayment}
            className="w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center"
            style={{ backgroundColor: brandColor }}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Payment Again
          </button>

          <div className="flex space-x-3">
            <button 
              onClick={handleGoHome}
              className="flex-1 py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center"
              style={{ borderColor: brandColor, color: brandColor }}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Continue Shopping
            </button>
            <button 
              onClick={handleContactSupport}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold transition-all duration-300 hover:shadow-lg hover:border-gray-400 flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-1" />
              Get Help
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className={`transition-all duration-1000 delay-1100 ${
          showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Package className="w-4 h-4 mr-2" style={{ color: brandColor }} />
              Need Assistance?
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>Call us: +94 11 234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>Email: support@srilankanhandicrafts.lk</span>
              </div>
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                <span>Our support team is available 24/7 to help with payment issues</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reassurance Message */}
        <div className={`text-center mt-6 transition-all duration-1000 delay-1300 ${
          showAnimation ? 'opacity-100' : 'opacity-0'
        }`}>
          <p className="text-sm text-gray-600">
            🔒 Your payment information is secure and was not charged
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Your selected handicraft items are saved and waiting for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(PaymentCancel);