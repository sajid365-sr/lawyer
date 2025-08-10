"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import BookingCalendar from "../../components/BookingCalendar";
import PaymentInterface from "../../components/PaymentInterface";
import Image from "next/image";
import { mockLawyers } from "@/mockData";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function BookingPage() {
  const params = useParams();
  const lawyerId = params.lawyerid;
  const [currentStep, setCurrentStep] = useState("calendar");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [completedPayment, setCompletedPayment] = useState(null);

  // Find the lawyer
  const lawyer = mockLawyers.find((l) => l.id === lawyerId);

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Lawyer Not Found
          </h1>
          <p className="text-gray-600">
            The lawyer you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  // Mock available slots
  const availableSlots = [];

  const handleBookingSelect = (slot, duration) => {
    const booking = {
      id: `booking_${Date.now()}`,
      clientId: "current_user", // This would come from auth
      lawyerId: lawyer.id,
      date: slot.date,
      time: slot.startTime,
      duration,
      status: "pending",
      type: "consultation",
      notes: "Initial consultation",
      totalAmount: (lawyer.hourlyRate * duration) / 60,
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    setSelectedBooking(booking);
    setCurrentStep("payment");
  };

  const handlePaymentComplete = (payment) => {
    setCompletedPayment(payment);
    setCurrentStep("confirmation");
  };

  const handlePaymentCancel = () => {
    setCurrentStep("calendar");
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center space-x-4">
              <Image
                src={lawyer.image}
                alt={lawyer.name}
                height={80}
                width={80}
                className="rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {lawyer.name}
                </h1>
                <p className="text-gray-600">{lawyer.title}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium">{lawyer.rating}</span>
                    <span className="text-sm text-gray-500">
                      ({lawyer.reviewCount} reviews)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ${lawyer.hourlyRate}/hour
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center space-x-8">
              <div
                className={`flex items-center space-x-2 ${
                  currentStep === "calendar"
                    ? "text-blue-600"
                    : currentStep === "payment" ||
                      currentStep === "confirmation"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "calendar"
                      ? "bg-blue-600 text-white"
                      : currentStep === "payment" ||
                        currentStep === "confirmation"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span className="font-medium">Select Time</span>
              </div>

              <div
                className={`flex items-center space-x-2 ${
                  currentStep === "payment"
                    ? "text-blue-600"
                    : currentStep === "confirmation"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "payment"
                      ? "bg-blue-600 text-white"
                      : currentStep === "confirmation"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span className="font-medium">Payment</span>
              </div>

              <div
                className={`flex items-center space-x-2 ${
                  currentStep === "confirmation"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "confirmation"
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span className="font-medium">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === "calendar" && (
          <BookingCalendar
            lawyerId={lawyer.id}
            lawyerName={lawyer.name}
            hourlyRate={lawyer.hourlyRate}
            availableSlots={availableSlots}
            onBookingSelect={handleBookingSelect}
          />
        )}

        {currentStep === "payment" && selectedBooking && (
          <PaymentInterface
            booking={selectedBooking}
            onPaymentComplete={handlePaymentComplete}
            onPaymentCancel={handlePaymentCancel}
          />
        )}

        {currentStep === "confirmation" &&
          completedPayment &&
          selectedBooking && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckIcon className="w-8 h-8 text-green-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 mb-8">
                  Your consultation with {lawyer.name} has been successfully
                  booked and paid for.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Booking Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lawyer:</span>
                      <span className="text-gray-900">{lawyer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="text-gray-900">
                        {selectedBooking.date} at {selectedBooking.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="text-gray-900">
                        {selectedBooking.duration} minutes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Paid:</span>
                      <span className="text-gray-900">
                        ${completedPayment.amount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="text-gray-900">
                        {completedPayment.transactionId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    You will receive a confirmation email with the meeting link
                    shortly. The lawyer will also be notified of your booking.
                  </p>

                  <div className="flex space-x-4">
                    <Button
                      onClick={() =>
                        (window.location.href = "/dashboard/client")
                      }
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/browse")}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                    >
                      Browse More Lawyers
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
