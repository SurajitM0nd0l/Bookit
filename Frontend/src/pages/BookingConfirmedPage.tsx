import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import AppBar from "../components/Appbar";

const BookingConfirmedPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppBar />

      <div className="flex flex-col items-center justify-center flex-grow px-6 py-20 text-center">
        <CheckCircle className="text-green-500 w-20 h-20 mb-6" />
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Booking Confirmed
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Ref ID: <span className="font-medium">{bookingId}</span>
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmedPage;
