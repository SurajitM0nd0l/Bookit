import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExperiencesPage from "./pages/ExperiencesPage";
import ExperienceDetailsPage from "./pages/ExperienceDetailsPage";
import ExperienceCheckoutPage from "./pages/ExperienceCheckoutPage";
import BookingConfirmedPage from "./pages/BookingConfirmedPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 1️⃣ Show all experiences */}
        <Route path="/" element={<ExperiencesPage />} />

        {/* 2️⃣ Show details for one experience */}
        <Route path="/experience/:id" element={<ExperienceDetailsPage />} />

        {/* 3️⃣ Checkout after booking */}
        <Route path="/checkout" element={<ExperienceCheckoutPage />} />

        <Route path="/booking-confirmed/:bookingId" element={<BookingConfirmedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
