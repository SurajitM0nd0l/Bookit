import React, { useState } from "react";

interface BookingFormProps {
  onPromoApply: (discount: number, promoCode: string) => void;
  onUserDetailsChange: (name: string, email: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onPromoApply, onUserDetailsChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    promo: "",
    agreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "name" || name === "email") {
      onUserDetailsChange(
        name === "name" ? value : formData.name,
        name === "email" ? value : formData.email
      );
    }
  };

  const handleApply = async () => {
    const promo = formData.promo.trim().toUpperCase();
    if (!promo) return alert("Enter a promo code!");

    try {
      const res = await fetch("http://localhost:3000/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promo }),
      });

      const data = await res.json();
      if (data.valid) {
        alert(`${data.discountPercent}% discount applied!`);
        onPromoApply(data.discountPercent, promo);
      } else {
        alert("Invalid promo code.");
        onPromoApply(0, "");
      }
    } catch (err) {
      console.error(err);
      alert("Error validating promo code.");
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 md:p-8 w-full text-gray-800 shadow-sm">
      {/* Full Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-3 py-2 bg-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full px-3 py-2 bg-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* Promo Code */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <input
          type="text"
          name="promo"
          value={formData.promo}
          onChange={handleChange}
          placeholder="Promo code"
          className="flex-1 px-3 py-2 bg-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleApply}
          className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition text-sm"
        >
          Apply
        </button>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          name="agreed"
          checked={formData.agreed}
          onChange={handleChange}
          className="w-4 h-4 accent-yellow-400 mt-1"
        />
        <label className="text-sm text-gray-700 leading-snug">
          I agree to the <span className="text-yellow-600 cursor-pointer hover:underline">terms</span> and{" "}
          <span className="text-yellow-600 cursor-pointer hover:underline">safety policy</span>.
        </label>
      </div>
    </div>
  );
};

export default BookingForm;
