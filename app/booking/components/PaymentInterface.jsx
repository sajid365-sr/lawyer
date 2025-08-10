"use client";

import React, { useState } from "react";
import {
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function PaymentInterface({
  booking,
  onPaymentComplete,
  onPaymentCancel,
}) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const platformFeePercentage = 0.15;
  const platformFee = booking.totalAmount * platformFeePercentage;
  const processingFee = 2.99;
  const totalAmount = booking.totalAmount + processingFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus("processing");

    setTimeout(() => {
      const success = Math.random() > 0.1;

      if (success) {
        setPaymentStatus("success");

        const payment = {
          id: `pay_${Date.now()}`,
          bookingId: booking.id,
          clientId: booking.clientId,
          lawyerId: booking.lawyerId,
          amount: totalAmount,
          platformFee,
          lawyerEarnings: booking.totalAmount - platformFee,
          status: "completed",
          paymentMethod,
          transactionId: `txn_${Date.now()}`,
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        };

        setTimeout(() => {
          onPaymentComplete(payment);
        }, 2000);
      } else {
        setPaymentStatus("failed");
        setIsProcessing(false);
      }
    }, 3000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  if (paymentStatus === "success") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <div className="text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking has been confirmed and the lawyer has been notified.
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Transaction ID:</strong> txn_{Date.now()}
            </p>
            <p className="text-sm text-green-800">
              <strong>Amount Paid:</strong> ${totalAmount.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <div className="text-center">
          <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't process your payment. Please try again or use a
            different payment method.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setPaymentStatus("idle");
                setIsProcessing(false);
              }}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onPaymentCancel}
              className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Complete Your Payment
        </h2>
        <p className="text-gray-600">
          Secure payment processing with 256-bit SSL encryption
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Session ({booking.duration} minutes)
            </span>
            <span className="text-gray-900">
              ${booking.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Processing Fee</span>
            <span className="text-gray-900">${processingFee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { type: "card", icon: CreditCardIcon, label: "Card" },
            { type: "bank", icon: BanknotesIcon, label: "Bank" },
            { type: "wallet", icon: ShieldCheckIcon, label: "Wallet" },
          ].map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => setPaymentMethod(type)}
              className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                paymentMethod === type
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Icon className="w-6 h-6 text-gray-600" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {paymentMethod === "card" && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  number: formatCardNumber(e.target.value),
                })
              }
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                }
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={4}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, name: e.target.value })
              }
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {paymentMethod === "bank" && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            You will be redirected to your bank's secure portal to complete the
            payment.
          </p>
        </div>
      )}

      {paymentMethod === "wallet" && (
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            Pay using your digital wallet. Supported: Apple Pay, Google Pay,
            PayPal.
          </p>
        </div>
      )}

      <div className="flex items-center space-x-2 mb-6 text-sm text-gray-600">
        <LockClosedIcon className="w-4 h-4" />
        <span>Your payment information is encrypted and secure</span>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={onPaymentCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          onClick={handlePayment}
          disabled={isProcessing || paymentStatus === "processing"}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            `Pay $${totalAmount.toFixed(2)}`
          )}
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        By completing this payment, you agree to our Terms of Service and
        Privacy Policy. Payments are processed securely through our certified
        payment partners.
      </p>
    </div>
  );
}
