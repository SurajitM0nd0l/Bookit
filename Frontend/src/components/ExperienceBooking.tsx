import React from "react";

interface Slot {
  date: string;
  time: string;
  isBooked: boolean;
}

interface ExperienceBookingProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  title: string;
  description: string;
  slots: Slot[];
}

const ExperienceBooking: React.FC<ExperienceBookingProps> = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  title,
  description,
  slots,
}) => {
  // Extract unique dates
  const dates = Array.from(new Set(slots.map((s) => s.date)));

  // Filter slots for the selected date
  const timeSlots = slots
    .filter((s) => s.date === selectedDate)
    .map((s) => ({
      time: s.time,
      soldOut: s.isBooked,
    }));

  return (
    <div className="bg-white rounded-2xl w-full">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>

      {/* Date Picker */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">Choose date</h3>
        <div className="flex gap-3 flex-wrap">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                selectedDate === date
                  ? "bg-yellow-400 border-yellow-400 text-black"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Time Picker */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">Choose time</h3>
        <div className="flex flex-wrap gap-3">
          {timeSlots.length > 0 ? (
            timeSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={slot.soldOut}
                onClick={() => setSelectedTime(slot.time)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm transition ${
                  slot.soldOut
                    ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                    : selectedTime === slot.time
                    ? "border-yellow-400 bg-yellow-50 text-black"
                    : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span>{slot.time}</span>
                {slot.soldOut ? (
                  <span className="text-gray-500 text-xs font-medium">Sold out</span>
                ) : (
                  <span className="text-green-600 text-xs font-medium">Available</span>
                )}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">No available slots for this date</p>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          All times are in IST (GMT +5:30)
        </p>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-2">About</h3>
        <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">
          Scenic routes, trained guides, and safety briefing. Minimum age 10.
        </p>
      </div>
    </div>
  );
};

export default ExperienceBooking;
