import React from "react";

interface BookingSummaryProps {
  basePrice: number;
  taxRate?: number;
  selectedTime?: string | null;
  quantity: number;
  setQuantity: (qty: number) => void;
  onConfirm?: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  basePrice,
  taxRate = 6,
  selectedTime,
  quantity,
  setQuantity,
  onConfirm,
}) => {
  const subtotal = basePrice * quantity;
  const taxes = Math.round((subtotal * taxRate) / 100);
  const total = subtotal + taxes;

  const decreaseQty = () => setQuantity(Math.max(1, quantity - 1));
  const increaseQty = () => setQuantity(quantity + 1);

  return (
    <div className="w-80 bg-gray-50 rounded-2xl shadow-sm p-6 text-gray-700">
      <div className="flex justify-between mb-3">
        <span>Starts at</span>
        <span className="font-medium text-black">₹{basePrice}</span>
      </div>

      {/* Quantity Selector */}
      <div className="flex justify-between mb-3 items-center">
        <span>Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseQty}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            onClick={increaseQty}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span className="font-medium text-black">₹{subtotal}</span>
      </div>

      <div className="flex justify-between mb-4">
        <span>Taxes</span>
        <span className="font-medium text-black">₹{taxes}</span>
      </div>

      <hr className="mb-4" />

      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-semibold text-black">Total</span>
        <span className="text-lg font-bold text-black">₹{total}</span>
      </div>

      {/* Confirm Button */}
      <button
        disabled={!selectedTime}
        onClick={onConfirm}
        className={`w-full py-3 rounded-lg font-medium transition ${
          selectedTime
            ? "bg-yellow-400 hover:bg-yellow-500 text-black"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        Confirm
      </button>
    </div>
  );
};

export default BookingSummary;
