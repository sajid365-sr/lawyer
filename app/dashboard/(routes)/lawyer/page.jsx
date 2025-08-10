"use client";

import { useState } from "react";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UsersIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { format, addDays } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function LawyerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data
  const dashboardData = {
    upcomingBookings: [
      {
        id: "1",
        clientId: "client1",
        lawyerId: "lawyer1",
        date: "2025-08-05",
        time: "10:00",
        duration: 60,
        status: "confirmed",
        type: "consultation",
        notes: "Initial consultation for divorce proceedings",
        meetingLink: "https://meet.example.com/room1",
        totalAmount: 200,
        paymentStatus: "paid",
        createdAt: "2025-08-01T10:00:00Z",
      },
      {
        id: "2",
        clientId: "client2",
        lawyerId: "lawyer1",
        date: "2025-08-05",
        time: "14:00",
        duration: 90,
        status: "pending",
        type: "meeting",
        notes: "Contract review meeting",
        totalAmount: 300,
        paymentStatus: "pending",
        createdAt: "2025-08-02T09:00:00Z",
      },
    ],
    todayBookings: [
      {
        id: "3",
        clientId: "client3",
        lawyerId: "lawyer1",
        date: "2025-08-02",
        time: "11:00",
        duration: 60,
        status: "confirmed",
        type: "consultation",
        notes: "Legal advice consultation",
        meetingLink: "https://meet.example.com/room3",
        totalAmount: 200,
        paymentStatus: "paid",
        createdAt: "2025-07-30T10:00:00Z",
      },
    ],
    monthlyEarnings: 4500,
    totalClients: 28,
    averageRating: 4.8,
    recentReviews: [
      {
        id: "1",
        clientName: "John Smith",
        rating: 5,
        comment: "Excellent service and very professional. Highly recommended!",
        date: "2025-08-01",
        lawyerId: "lawyer1",
      },
      {
        id: "2",
        clientName: "Jane Doe",
        rating: 4,
        comment: "Very knowledgeable and helpful throughout the process.",
        date: "2025-07-28",
        lawyerId: "lawyer1",
      },
    ],
    availableSlots: [
      {
        id: "1",
        lawyerId: "lawyer1",
        date: "2025-08-05",
        startTime: "09:00",
        endTime: "10:00",
        isAvailable: true,
        isBooked: false,
      },
      {
        id: "2",
        lawyerId: "lawyer1",
        date: "2025-08-05",
        startTime: "11:00",
        endTime: "12:00",
        isAvailable: true,
        isBooked: false,
      },
    ],
  };

  // Mock earnings data for charts
  const earningsData = [
    { month: "Jan", earnings: 3200 },
    { month: "Feb", earnings: 3800 },
    { month: "Mar", earnings: 4200 },
    { month: "Apr", earnings: 3900 },
    { month: "May", earnings: 4500 },
    { month: "Jun", earnings: 4800 },
    { month: "Jul", earnings: 4500 },
  ];

  const clientsData = [
    { month: "Jan", clients: 15 },
    { month: "Feb", clients: 18 },
    { month: "Mar", clients: 22 },
    { month: "Apr", clients: 20 },
    { month: "May", clients: 25 },
    { month: "Jun", clients: 28 },
    { month: "Jul", clients: 28 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "pending":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case "cancelled":
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Lawyer Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your practice and client appointments
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CalendarDaysIcon className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Today's Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.todayBookings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Monthly Earnings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${dashboardData.monthlyEarnings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UsersIcon className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Clients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.totalClients}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <StarIcon className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.averageRating}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", name: "Overview", icon: CalendarDaysIcon },
                { id: "bookings", name: "Bookings", icon: CalendarDaysIcon },
                { id: "schedule", name: "Schedule", icon: ClockIcon },
                { id: "earnings", name: "Earnings", icon: CurrencyDollarIcon },
                { id: "reviews", name: "Reviews", icon: StarIcon },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Today's Schedule */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Today's Schedule
                    </h3>
                    {dashboardData.todayBookings.length === 0 ? (
                      <p className="text-gray-500">No appointments today</p>
                    ) : (
                      <div className="space-y-3">
                        {dashboardData.todayBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  {getStatusIcon(booking.status)}
                                  <span className="font-medium text-gray-900">
                                    {booking.time}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    ({booking.duration} min)
                                  </span>
                                </div>
                                <h4 className="font-medium text-gray-900">
                                  {booking.type.charAt(0).toUpperCase() +
                                    booking.type.slice(1)}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {booking.notes}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                {booking.meetingLink && (
                                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                    <VideoCameraIcon className="w-5 h-5" />
                                  </button>
                                )}
                                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Reviews */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Recent Reviews
                    </h3>
                    <div className="space-y-4">
                      {dashboardData.recentReviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium text-gray-900">
                                  {review.clientName}
                                </span>
                                <div className="flex space-x-1">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">
                                {review.comment}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {format(new Date(review.date), "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Monthly Overview
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Earnings Trend
                      </h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={earningsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`$${value}`, "Earnings"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="earnings"
                            stroke="#3B82F6"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Client Growth
                      </h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={clientsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [value, "Clients"]} />
                          <Bar dataKey="clients" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    All Bookings
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <PlusIcon className="w-4 h-4" />
                    <span>Block Time</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    ...dashboardData.todayBookings,
                    ...dashboardData.upcomingBookings,
                  ].map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(booking.status)}
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {booking.type.charAt(0).toUpperCase() +
                                booking.type.slice(1)}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-900">
                            {booking.notes}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {format(new Date(booking.date), "MMMM d, yyyy")} at{" "}
                            {booking.time} ({booking.duration} min)
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-2">
                            ${booking.totalAmount} -{" "}
                            {booking.paymentStatus === "paid"
                              ? "Paid"
                              : "Pending Payment"}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {booking.status === "confirmed" &&
                            booking.meetingLink && (
                              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                                Start Call
                              </button>
                            )}
                          {booking.status === "pending" && (
                            <>
                              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                                Accept
                              </button>
                              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                                Decline
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === "schedule" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Manage Schedule
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <PlusIcon className="w-4 h-4" />
                    <span>Add Available Slot</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">
                      Available Time Slots
                    </h4>
                    <div className="space-y-3">
                      {dashboardData.availableSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {format(new Date(slot.date), "MMM d, yyyy")}
                            </p>
                            <p className="text-sm text-gray-600">
                              {slot.startTime} - {slot.endTime}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                slot.isBooked
                                  ? "text-red-600 bg-red-100"
                                  : "text-green-600 bg-green-100"
                              }`}
                            >
                              {slot.isBooked ? "Booked" : "Available"}
                            </span>
                            <button className="text-red-600 hover:text-red-800 text-sm">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">
                      Weekly Overview
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center text-sm font-medium text-gray-600 py-2"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 35 }, (_, i) => {
                          const date = addDays(new Date(), i - 15);
                          const hasBooking = Math.random() > 0.7;
                          return (
                            <div
                              key={i}
                              className={`aspect-square flex items-center justify-center text-sm rounded cursor-pointer ${
                                hasBooking
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-white text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {date.getDate()}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === "earnings" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Earnings Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-green-900">This Month</h4>
                      <p className="text-2xl font-bold text-green-900">
                        ${dashboardData.monthlyEarnings.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600">
                        +12% from last month
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900">
                        Pending Payouts
                      </h4>
                      <p className="text-2xl font-bold text-blue-900">$1,250</p>
                      <p className="text-sm text-blue-600">
                        Available in 3 days
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900">
                        Total Earned
                      </h4>
                      <p className="text-2xl font-bold text-purple-900">
                        $28,450
                      </p>
                      <p className="text-sm text-purple-600">Since joining</p>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Monthly Earnings Trend
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`$${value}`, "Earnings"]}
                        />
                        <Bar dataKey="earnings" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Client Reviews
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <div className="flex justify-center space-x-1 mb-2">
                        {renderStars(5)}
                      </div>
                      <p className="text-2xl font-bold text-yellow-900">
                        {dashboardData.averageRating}
                      </p>
                      <p className="text-sm text-yellow-600">Average Rating</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-900">156</p>
                      <p className="text-sm text-blue-600">Total Reviews</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-900">94%</p>
                      <p className="text-sm text-green-600">Positive Reviews</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {dashboardData.recentReviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="font-medium text-gray-900">
                                {review.clientName}
                              </span>
                              <div className="flex space-x-1">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">
                                {format(new Date(review.date), "MMM d, yyyy")}
                              </span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
