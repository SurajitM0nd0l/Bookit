import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "../components/Appbar";
import BookingForm from "../components/BookingForm";
import SummaryCard from "../components/SummaryCard";

const ExperienceCheckoutPage: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state || {};
  const navigate = useNavigate();

  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

  if (!bookingData?.experienceId) {
    return (
      <div className="text-center py-10">
        <p>⚠️ No booking data found. Please go back and select an experience.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-yellow-400 rounded-lg font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <AppBar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Back Button */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => navigate(`/experience/${bookingData.experienceId}`)}
            className="text-gray-600 hover:text-black text-sm font-medium flex items-center"
          >
            ← Back
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingForm
              onPromoApply={(discount, code) => {
                setDiscountPercent(discount);
                setPromoCode(code);
              }}
              onUserDetailsChange={(name, email) => setUserDetails({ name, email })}
            />
          </div>

          <div className="flex justify-center lg:justify-end">
            <SummaryCard
              experienceId={bookingData.experienceId}
              experience={bookingData.experienceTitle}
              date={bookingData.date}
              time={bookingData.time}
              quantity={bookingData.quantity}
              basePrice={bookingData.subtotal}
              tax={bookingData.taxes}
              total={bookingData.total}
              discountPercent={discountPercent}
              promoCode={promoCode}
              name={userDetails.name}
              email={userDetails.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCheckoutPage;
