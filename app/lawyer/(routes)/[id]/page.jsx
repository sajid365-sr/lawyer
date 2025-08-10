"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockLawyers, mockReviews } from "@/mockData";
import Image from "next/image";
import Link from "next/link";
import { format, addDays } from "date-fns";
import { CheckIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

export default function LawyerProfile() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [showBooking, setShowBooking] = useState(
    searchParams.get("book") === "true"
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("video");
  const [error, setError] = useState("");

  const lawyer = mockLawyers.find((l) => l.id === params.id);
  const reviews = mockReviews.filter((r) => r.lawyerId === params.id);

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Lawyer Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The lawyer you're looking for doesn't exist.
          </p>
          <Link
            href="/browse"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Lawyers
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate available dates starting from tomorrow
  const availableDates = Array.from({ length: 5 }, (_, i) =>
    format(addDays(new Date(), i + 1), "yyyy-MM-dd")
  );

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleBookConsultation = () => {
    if (!selectedDate) {
      setError("Please select a date for your consultation.");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time for your consultation.");
      return;
    }

    // Here you would typically send the booking data to your backend
    alert(
      `Consultation booked for ${format(
        new Date(selectedDate),
        "MMMM d, yyyy"
      )} at ${selectedTime}. You will receive a confirmation email shortly.`
    );
    setShowBooking(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lawyer Header */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    width={150}
                    height={150}
                    className="rounded-full object-cover"
                  />
                  {lawyer.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                      <CheckIcon className="w-10 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {lawyer.name}
                      </h1>
                      <p className="text-xl text-gray-600 mb-4">
                        {lawyer.title}
                      </p>

                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <MapPinIcon className="w-5" />
                          <span>{lawyer.location}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-5" />
                          <span>{lawyer.experience} years experience</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(lawyer.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-lg font-semibold text-gray-900">
                            {lawyer.rating}
                          </span>
                          <span className="ml-1 text-gray-600">
                            ({lawyer.reviewCount} reviews)
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            lawyer.availability === "Available"
                              ? "bg-green-100 text-green-800"
                              : lawyer.availability === "Busy"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {lawyer.availability}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    ${lawyer.hourlyRate}/hour
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowBooking(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      aria-label={`Book consultation with ${lawyer.name}`}
                    >
                      Book Consultation
                    </button>
                    <button
                      className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                      aria-label={`Send message to ${lawyer.name}`}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{lawyer.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Practice Areas
                  </h3>
                  <div className="space-y-2">
                    {lawyer.practiceAreas.map((area, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <CheckIcon className="w-4 text-blue-600" />
                        <span className="text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Languages
                  </h3>
                  <div className="space-y-2">
                    {lawyer.languages.map((language, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <CheckIcon className="w-4 text-blue-600" />
                        <span className="text-gray-700">{language}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Education
              </h2>
              <div className="space-y-4">
                {lawyer.education.map((edu, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-900 font-medium">{edu}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Client Reviews
              </h2>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(lawyer.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-medium text-gray-900">
                          {review.clientName}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Info
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hourly Rate:</span>
                  <span className="font-semibold text-gray-900">
                    ${lawyer.hourlyRate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-semibold text-gray-900">
                    {lawyer.experience} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-semibold text-gray-900">
                    {lawyer.rating}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-semibold text-gray-900">
                    {lawyer.reviewCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <span
                    className={`font-semibold ${
                      lawyer.availability === "Available"
                        ? "text-green-600"
                        : lawyer.availability === "Busy"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {lawyer.availability}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link href={`/booking/${lawyer.id}`}>
                  <Button
                    className="w-full bg-blue-600 mb-3"
                    aria-label={`Book consultation with ${lawyer.name}`}
                  >
                    Book Consultation
                  </Button>
                </Link>
                <Button
                  className="w-full"
                  variant="outline"
                  aria-label={`Send message to ${lawyer.name}`}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Book Consultation
              </h3>
              <Button
                onClick={() => {
                  setShowBooking(false);
                  setError("");
                }}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close booking modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div>
                <label
                  htmlFor="consultation-type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Consultation Type
                </label>
                <select
                  id="consultation-type"
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-required="true"
                >
                  <option value="video">Video Call</option>
                  <option value="phone">Phone Call</option>
                  <option value="in-person">In-Person</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="consultation-date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Date
                </label>
                <select
                  id="consultation-date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-required="true"
                >
                  <option value="">Choose a date</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {format(new Date(date), "EEEE, MMMM d, yyyy")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="consultation-time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Time
                </label>
                <select
                  id="consultation-time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-required="true"
                >
                  <option value="">Choose a time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="font-semibold text-gray-900">
                    ${lawyer.hourlyRate}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowBooking(false);
                    setError("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="Cancel booking"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookConsultation}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Confirm booking"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
