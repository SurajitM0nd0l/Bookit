import React from "react";
import { useNavigate } from "react-router-dom";

interface SummaryCardProps {
  experience: string;
  experienceId?: string; // added for API
  date: string;
  time: string;
  basePrice: number;
  quantity?: number;
  tax?: number;
  total?: number;
  discountPercent?: number;
  promoCode?: string;
  name?: string;
  email?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  experience,
  experienceId,
  date,
  time,
  basePrice,
  quantity = 1,
  tax = 0,
  total = 0,
  discountPercent = 0,
  promoCode = "",
  name = "",
  email = "",
}) => {
  const navigate = useNavigate();

  const subtotal = basePrice;
  const discount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = total - Math.round((total * discountPercent) / 100);

  const handleBooking = async () => {
    try {
      const res = await fetch("https://bookit-backend-2hha.onrender.com/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId,
          name: name || "Guest User",
          email: email || "guest@example.com",
          date,
          time,
          promoCode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        navigate(`/booking-confirmed/${data.bookingId}`);
      } else {
        alert(data.message || "Booking failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-sm bg-gray-50 rounded-2xl shadow-sm p-6 text-gray-700">
      <div className="space-y-2 mb-5">
        <div className="flex justify-between">
          <span>Experience</span>
          <span className="font-medium text-black text-right truncate max-w-[150px]">
            {experience}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Date</span>
          <span className="font-medium text-black">{date}</span>
        </div>
        <div className="flex justify-between">
          <span>Time</span>
          <span className="font-medium text-black">{time}</span>
        </div>
        <div className="flex justify-between">
          <span>Qty</span>
          <span className="font-medium text-black">{quantity}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-black">₹{subtotal}</span>
        </div>
        {discountPercent > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discountPercent}%)</span>
            <span>-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Taxes</span>
          <span className="font-medium text-black">₹{tax}</span>
        </div>
      </div>

      <hr className="mb-4" />

      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-semibold text-black">Total</span>
        <span className="text-lg font-bold text-black">₹{finalTotal}</span>
      </div>

      <button
        onClick={handleBooking}
        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium transition"
      >
        Pay and Confirm
      </button>
    </div>
  );
};

export default SummaryCard;
