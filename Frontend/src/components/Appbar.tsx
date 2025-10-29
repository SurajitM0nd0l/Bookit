import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

interface AppbarProps {
  onSearch?: (query: string) => void;
}

const Appbar: React.FC<AppbarProps> = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim().toLowerCase());
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-22 py-3 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-22 h-12 object-contain" />
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-3">
          <input
            type="text"
            placeholder="Search experiences"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-5 py-2 rounded-md transition-colors"
          >
            Search
          </button>
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Search */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 px-4 pb-4 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Search experiences"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-md transition-colors"
          >
            Search
          </button>
        </div>
      )}
    </header>
  );
};

export default Appbar;
