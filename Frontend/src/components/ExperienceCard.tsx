import React from "react";
import { useNavigate } from "react-router-dom";

interface ExperienceCardProps {
  id:string;
  image: string;
  title: string;
  location: string;
  description: string;
  price: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  image,
  title,
  location,
  description,
  price,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/experience/${id}`); // 👈 Navigate to the details page
  };
  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
            {location}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-800 font-medium">
            From <span className="font-semibold text-black">₹{price}</span>
          </p>
          <button onClick={handleViewDetails} className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium px-4 py-2 rounded-md transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
