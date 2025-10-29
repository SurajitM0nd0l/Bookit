# 🌍 BookIt: Experiences & Slots
**BookIt** is a full-stack web application that lets users explore curated travel experiences, choose preferred dates and slots, apply promo codes, and confirm their bookings — all through a clean, responsive, and intuitive interface.
## 🚀 Features
- 🧭 Explore and book travel experiences effortlessly  
- 🕒 Select date, time, and number of participants  
- 💸 Apply promo codes for instant discounts  
- 📅 Receive instant booking confirmation with a reference ID  
- 📱 Fully responsive and modern UI design  
## 🧠 Tech Stack
**Frontend:** React + TypeScript (Vite), TailwindCSS, Lucide Icons  
**Backend:** Node.js, Express.js, MongoDB (Mongoose ORM)  
## ⚙️ Installation & Setup
1️⃣ **Clone the repository**  
`git clone https://github.com/<your-username>/bookit.git`  
`cd bookit`  
2️⃣ **Install dependencies**  
`npm install`  
3️⃣ **Setup environment variables (optional for backend)**  
Create a `.env` file inside backend and add:  
`MONGO_URI=your_mongodb_connection_string`  
`PORT=3000`  
4️⃣ **Run the development server**  
`npm run dev`  
## 🧩 API Endpoints
**Experiences**  
- `GET /experiences` → Fetch all experiences  
- `GET /experiences/:id` → Fetch a specific experience  
**Bookings**  
- `POST /bookings` → Create a new booking  
- `GET /bookings/:id` → Retrieve booking details  
## 👨‍💻 Author
**Surajit Mondal**  
📍 B.Tech in Computer Science and Engineering, University of Engineering & Management (UEM), India
