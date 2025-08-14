"use client";

import { useState } from "react";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  HeartIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import Image from "next/image";
import { dashboardData } from "@/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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

  const statsCards = [
    {
      icon: CalendarDaysIcon,
      text: "Upcoming Bookings",
      data: dashboardData.upcomingBookings.length,
    },
    {
      icon: CheckCircleIcon,
      text: "Completed Sessions",
      data: dashboardData.pastBookings.length,
    },
    {
      icon: CreditCardIcon,
      text: "Total Spent",
      data: dashboardData.totalSpent,
    },
    {
      icon: HeartIcon,
      text: "Favorite Lawyers",
      data: dashboardData.favoriteLaywers.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b items-center flex justify-between">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Client Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your legal consultations and bookings
            </p>
          </div>
        </div>

        <div>
          <Image
            src="https://ui-avatars.com/api/?name=John+Smith&size=50&background=4F46E5&color=ffffff"
            alt=""
            width={50}
            height={50}
            className="mr-6 rounded-full"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statsCards.map(({ icon: Icon, text, data }) => (
            <Card key={text} className="shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Icon className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{text}</p>
                    <p className="text-2xl font-bold text-gray-900">{data}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Card className="shadow">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex space-x-4 bg-white px-6 py-4">
              {[
                { id: "overview", name: "Overview", icon: CalendarDaysIcon },
                { id: "bookings", name: "My Bookings", icon: CalendarDaysIcon },
                { id: "payments", name: "Payments", icon: CreditCardIcon },
                { id: "favorites", name: "Favorite Lawyers", icon: HeartIcon },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center px-5 py-3 space-x-2"
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <CardContent className="p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Upcoming Bookings */}
                  <div>
                    <Card className="mb-5">
                      <CardHeader>
                        <CardTitle>Upcoming Bookings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {dashboardData.upcomingBookings.length === 0 ? (
                          <p className="text-gray-500">No upcoming bookings</p>
                        ) : (
                          <div className="space-y-4">
                            {dashboardData.upcomingBookings.map((booking) => (
                              <div
                                key={booking.id}
                                className="border rounded-lg p-4"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      {getStatusIcon(booking.status)}
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                          booking.status
                                        )}`}
                                      >
                                        {booking.status
                                          .charAt(0)
                                          .toUpperCase() +
                                          booking.status.slice(1)}
                                      </span>
                                    </div>
                                    <h4 className="font-medium text-gray-900">
                                      {booking.type.charAt(0).toUpperCase() +
                                        booking.type.slice(1)}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {booking.notes}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {format(
                                        new Date(booking.date),
                                        "MMMM d, yyyy"
                                      )}{" "}
                                      at {booking.time} ({booking.duration} min)
                                    </p>
                                  </div>
                                  <div className="flex space-x-2">
                                    {booking.meetingLink && (
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        title="Join Call"
                                      >
                                        <VideoCameraIcon className="w-5 h-5" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      title="Chat with Lawyer"
                                    >
                                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Payment completed
                              </p>
                              <p className="text-xs text-gray-500">
                                Consultation with Sarah Johnson - $200
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Booking confirmed
                              </p>
                              <p className="text-xs text-gray-500">
                                Meeting scheduled for August 5th
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === "bookings" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          ...dashboardData.upcomingBookings,
                          ...dashboardData.pastBookings,
                        ].map((booking) => (
                          <div
                            key={booking.id}
                            className="border rounded-lg p-4"
                          >
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
                                  {format(
                                    new Date(booking.date),
                                    "MMMM d, yyyy"
                                  )}{" "}
                                  at {booking.time} ({booking.duration} min)
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
                                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                      Join Call
                                    </Button>
                                  )}
                                {booking.status === "pending" && (
                                  <Button
                                    variant="destructive"
                                    className="hover:bg-red-700"
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === "payments" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Transaction
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {dashboardData.recentPayments.map((payment) => (
                              <tr key={payment.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      Booking #{payment.bookingId}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {payment.transactionId}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <p className="text-sm font-medium text-gray-900">
                                    ${payment.amount}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    via {payment.paymentMethod}
                                  </p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      payment.status === "completed"
                                        ? "text-green-600 bg-green-100"
                                        : payment.status === "pending"
                                        ? "text-yellow-600 bg-yellow-100"
                                        : "text-red-600 bg-red-100"
                                    }`}
                                  >
                                    {payment.status.charAt(0).toUpperCase() +
                                      payment.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {format(
                                    new Date(payment.createdAt),
                                    "MMM d, yyyy"
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === "favorites" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Favorite Lawyers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dashboardData.favoriteLaywers.map((lawyer) => (
                          <div
                            key={lawyer.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <Image
                                src={lawyer.image}
                                alt={lawyer.name}
                                className="w-12 h-12 rounded-full object-cover"
                                width={48}
                                height={48}
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {lawyer.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {lawyer.title}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <span className="text-yellow-400">★</span>
                                <span className="text-sm font-medium">
                                  {lawyer.rating}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ({lawyer.reviewCount})
                                </span>
                              </div>
                              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                Book Now
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
