// pages/Booking.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import CinemaHall from "../components/CinemaHall";
import BookingService from "../services/BookingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', email: '' });

  const handleSeatsSelected = (seats) => {
    setSelectedSeats(seats);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.phone || !userInfo.email) {
      toast.error('Всі поля повинні бути заповнені!');
      return;
    }
    if (!validateEmail(userInfo.email)) {
      toast.error('Некоректний формат email!');
      return;
    }
    BookingService.saveBooking(id, selectedSeats, userInfo);
    toast.success('Бронювання успішне!');
    setShowForm(false);
  };

  return (
    <div className="p-4">
      {!showForm ? (
        <CinemaHall movieId={id} onBookSeats={handleSeatsSelected} />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            value={userInfo.name}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={userInfo.phone}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
            className="border p-2"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Підтвердити бронювання
          </button>
        </form>
      )}
    </div>
  );
};

export default Booking;
