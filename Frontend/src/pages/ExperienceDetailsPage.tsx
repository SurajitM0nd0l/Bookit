import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppBar from "../components/Appbar";
import ExperienceBooking from "../components/ExperienceBooking";
import BookingSummary from "../components/BookingSummary";

const ExperienceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // shared booking states
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`http://localhost:3000/experiences/${id}`);
        const data = await res.json();
        setExperience(data);
      } catch (err) {
        console.error("Failed to fetch experience:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!experience) return <div className="text-center py-10">Experience not found</div>;

  // 🟡 confirm booking handler
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time!");
      return;
    }

    const taxRate = 6;
    const subtotal = experience.price * quantity;
    const taxes = Math.round((subtotal * taxRate) / 100);
    const total = subtotal + taxes;

    // Navigate to checkout with booking data
    navigate("/checkout", {
      state: {
        experienceId: experience._id,
        experienceTitle: experience.title,
        date: selectedDate,
        time: selectedTime,
        quantity,
        subtotal,
        taxes,
        total,
      },
    });
  };

  return (
    <div className="min-h-screen text-gray-800">
      <AppBar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Back Button */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-black text-sm font-medium flex items-center"
          >
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-72 object-cover rounded-xl mb-6"
            />

            <ExperienceBooking
              title={experience.title}
              description={experience.description}
              slots={experience.slots}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center lg:justify-end self-start">
            <BookingSummary
              basePrice={experience.price}
              taxRate={6}
              selectedTime={selectedTime}
              quantity={quantity}
              setQuantity={setQuantity}
              onConfirm={handleConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailsPage;
