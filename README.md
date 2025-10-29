# 🌍 BookIt: Experiences & Slots

BookIt is a full-stack web application that allows users to explore travel experiences, select available slots, apply promo codes, and confirm bookings.

---

## 🚀 Features

- 🧭 Browse and explore curated travel experiences  
- 🕒 Select date, time, and number of people  
- 💸 Apply promo codes for instant discounts  
- 📅 Confirm bookings and receive booking details  
- 🔒 Secure and responsive design  

---

## 🧠 Tech Stack

**Frontend**
- React + TypeScript (Vite)
- TailwindCSS
- Lucide Icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/bookit.git
cd bookit

### 2️⃣ Install Dependencies
- npm install

### 3️⃣ Setup Environment Variables
- Create a .env file inside the backend folder:
MONGO_URI=your_mongodb_connection_string
PORT=3000

### 4️⃣ Run the Development Server
npm run dev

## 🧩 API Endpoints

### Experiences
- GET  /experiences        → Fetch all experiences
- GET  /experiences/:id    → Fetch single experience

### Bookings
- POST /bookings           → Create a new booking
- GET  /bookings/:id       → Get booking by ID

## 🧑‍💻 Author

- Surajit Mondal
- 📍 Computer Science and Engineering, UEM India

