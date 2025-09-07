import { memo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Check, Truck, Star } from "lucide-react";
import axios from "axios";

const PaymentSuccess = () => {
  // ✅ URL params (Stripe redirect: /success/:order_id/:amount)
  const { order_id, amount } = useParams();

  // Stripe sends amount in "cents" → convert to LKR
  const formattedAmount = Number(amount) / 100;

  const [payment_id] = useState(
    "PAY_" + Math.random().toString(36).substr(2, 9).toUpperCase()
  );
  const [reference_id] = useState(
    "REF_" + Math.random().toString(36).substr(2, 9).toUpperCase()
  );
  const [paymentStatus] = useState("confirmed");

  const brandColor = "rgb(125, 47, 9)";

  // ✅ Send order confirmation request on page load
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const email = localStorage.getItem("email"); // 👈 make sure you saved email in localStorage at login/register

    if (!jwt || !email) {
      console.error("Missing JWT or Email in localStorage");
      return;
    }

    axios.post(
      "http://localhost:8080/api/payment/orderconfirmation",
      {
        orderId: order_id,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log("✅ Order confirmation sent:", res.data);
    })
    .catch((err) => {
      console.error("❌ Error sending order confirmation:", err);
    });
  }, [order_id]);

  return (
    <div className="mt-15 min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-orange-100">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: brandColor }}
          >
            <Check className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-base text-gray-700 mb-6">
            🎉 <strong>Your Order Is Placed!</strong>
          </p>
        </div>

        {/* Order Details */}
        <div className="space-y-3 mb-8">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Order ID:</span>
                <p className="font-mono font-semibold">{order_id}</p>
              </div>
              <div>
                <span className="text-gray-600">Payment ID:</span>
                <p className="font-mono font-semibold">{payment_id}</p>
              </div>
              <div>
                <span className="text-gray-600">Reference:</span>
                <p className="font-mono font-semibold">{reference_id}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="font-semibold text-green-600 capitalize">
                  {paymentStatus}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Total Paid:</span>
                <p className="font-bold text-lg" style={{ color: brandColor }}>
                  LKR {formattedAmount}.00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2" style={{ color: brandColor }} />
            What happens next?
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-start space-x-3">
              <div
                className="w-2 h-2 rounded-full mt-2"
                style={{ backgroundColor: brandColor }}
              ></div>
              <p className="text-gray-700">
                Order confirmation email sent to your inbox
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div
                className="w-2 h-2 rounded-full mt-2"
                style={{ backgroundColor: brandColor }}
              ></div>
              <p className="text-gray-700">
                Your handicrafts will be carefully packaged
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div
                className="w-2 h-2 rounded-full mt-2"
                style={{ backgroundColor: brandColor }}
              ></div>
              <p className="text-gray-700">
                Delivery within 3-5 business days across Sri Lanka
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              className="flex-1 py-3 px-4 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: brandColor }}
              onClick={() => (window.location.href = "/orders")}
            >
              Track Order
            </button>
            <button
              className="flex-1 py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: brandColor, color: brandColor }}
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Thank You Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 flex items-center justify-center">
            <Star className="w-4 h-4 mr-1" style={{ color: brandColor }} />
            Supporting Sri Lankan artisans with every purchase
            <Star className="w-4 h-4 ml-1" style={{ color: brandColor }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(PaymentSuccess);
