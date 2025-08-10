"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { format, addDays, startOfDay, isAfter, parse } from "date-fns";
import { Button } from "@/components/ui/button";

export default function BookingCalendar({
  lawyerId,
  lawyerName,
  hourlyRate,
  availableSlots,
  onBookingSelect,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState(60);
  const [error, setError] = useState("");
  const currentDateTime = new Date(); // Use client-side date for consistency

  // Filter slots for selected date, excluding past slots on the current day
  const slotsForDate = availableSlots.filter((slot) => {
    const slotDateTime = parse(
      `${slot.date} ${slot.startTime}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    return (
      slotDateTime.toDateString() === selectedDate.toDateString() &&
      slot.isAvailable &&
      !slot.isBooked &&
      (selectedDate.toDateString() !== currentDateTime.toDateString() ||
        isAfter(slotDateTime, currentDateTime))
    );
  });

  // Generate time slots with deterministic initial availability
  const generateTimeSlots = (date) => {
    const slots = [];
    const timeSlots = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ];

    timeSlots.forEach((time, index) => {
      const endTime = timeSlots[index + 1] || "19:00";
      const slotDateTime = parse(
        `${format(date, "yyyy-MM-dd")} ${time}`,
        "yyyy-MM-dd HH:mm",
        new Date()
      );
      const isPastSlot =
        date.toDateString() === currentDateTime.toDateString() &&
        isAfter(currentDateTime, slotDateTime);

      // Deterministic availability: All slots initially available, updated client-side if needed
      slots.push({
        id: `${format(date, "yyyy-MM-dd")}-${time}`,
        lawyerId,
        date: format(date, "yyyy-MM-dd"),
        startTime: time,
        endTime,
        isAvailable: !isPastSlot, // Initial availability based on time only
        isBooked: false,
      });
    });

    return slots;
  };

  // Get available slots for selected date
  const getAvailableSlotsForDate = (date) => {
    if (
      isAfter(startOfDay(date), startOfDay(currentDateTime)) ||
      date.toDateString() === currentDateTime.toDateString()
    ) {
      return generateTimeSlots(date);
    }
    return [];
  };

  const availableSlotsForDate =
    slotsForDate.length > 0
      ? slotsForDate
      : getAvailableSlotsForDate(selectedDate);

  useEffect(() => {
    setSelectedSlot(null); // Reset selected slot when date changes
    setError("");
  }, [selectedDate]);

  const handleSlotSelect = (slot) => {
    if (!slot.isAvailable) {
      setError("This slot is not available for booking.");
      return;
    }
    setSelectedSlot(slot);
    setError("");
  };

  const handleBooking = () => {
    if (!selectedSlot) {
      setError("Please select a time slot for your consultation.");
      return;
    }
    if (!selectedSlot.isAvailable) {
      setError("The selected slot is not available.");
      return;
    }
    onBookingSelect(selectedSlot, duration);
    setError("");
  };

  const calculateCost = () => {
    return (hourlyRate * duration) / 60;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Book a Session with {lawyerName}
        </h3>
        <p className="text-gray-600">
          Select a date and time for your consultation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Select Date
          </h4>
          <Calendar
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
            minDate={currentDateTime}
            maxDate={addDays(currentDateTime, 30)}
            className="w-full border rounded-lg"
            tileClassName={({ date }) => {
              const hasSlots = getAvailableSlotsForDate(date).some(
                (slot) => slot.isAvailable
              );
              return hasSlots ? "bg-blue-50 hover:bg-blue-100" : "bg-gray-100";
            }}
            tileDisabled={({ date }) => isAfter(currentDateTime, date)}
            aria-label="Select consultation date"
          />
        </div>

        {/* Time Slots */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Available Times - {format(selectedDate, "MMMM d, yyyy")}
          </h4>

          {availableSlotsForDate.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No available slots for this date
            </p>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {availableSlotsForDate.map((slot) => (
                  <Button
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={!slot.isAvailable}
                    className={`w-full p-3 text-sm font-medium rounded-lg border transition-colors ${
                      selectedSlot?.id === slot.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : slot.isAvailable
                        ? "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                        : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                    }`}
                    aria-label={`Select time slot ${slot.startTime} on ${format(
                      new Date(slot.date),
                      "MMMM d, yyyy"
                    )}`}
                  >
                    {slot.startTime}
                  </Button>
                ))}
              </div>
            </>
          )}

          {/* Duration Selection */}
          {selectedSlot && (
            <div className="mb-6">
              <h5 className="text-md font-medium text-gray-900 mb-3">
                Session Duration
              </h5>
              <div className="space-y-2">
                {[30, 60, 90, 120].map((mins) => (
                  <label key={mins} className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value={mins}
                      checked={duration === mins}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                      aria-label={`${mins} minutes for $${(
                        (hourlyRate * mins) /
                        60
                      ).toFixed(2)}`}
                    />
                    <span className="text-gray-700">
                      {mins} minutes - ${((hourlyRate * mins) / 60).toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Booking Summary */}
          {selectedSlot && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h5 className="font-medium text-gray-900 mb-2">
                Booking Summary
              </h5>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Date: {format(selectedDate, "MMMM d, yyyy")}</p>
                <p>Time: {selectedSlot.startTime}</p>
                <p>Duration: {duration} minutes</p>
                <p className="font-medium text-gray-900">
                  Total: ${calculateCost().toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Book Button */}
          {selectedSlot && (
            <Button
              onClick={handleBooking}
              disabled={!selectedSlot.isAvailable}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              aria-label={`Book session for ${duration} minutes on ${format(
                selectedDate,
                "MMMM d, yyyy"
              )} at ${selectedSlot.startTime}`}
            >
              Book Session - ${calculateCost().toFixed(2)}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
