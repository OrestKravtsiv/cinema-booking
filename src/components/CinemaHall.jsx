import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingService from '../services/BookingService';
import './CinemaHall.css';
import 'react-toastify/dist/ReactToastify.css';

const rows = 5;
const seatsPerRow = 8;
const rowLetters = ['A', 'B', 'C', 'D', 'E'];

const CinemaHall = () => {
  const { id: movieId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    const booked = BookingService.getBookedSeats(movieId);
    setBookedSeats(booked);
  }, [movieId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, phone, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !phone || !email) {
      toast.error('Всі поля обов\'язкові для заповнення!');
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error('Невірний формат електронної пошти!');
      return false;
    }
    return true;
  };

  const handleBooking = () => {
    if (!validateForm()) return;
    if (selectedSeats.length === 0) {
      toast.error('Виберіть хоча б одне місце!');
      return;
    }

    BookingService.saveBooking(movieId, {
      seats: selectedSeats,
      ...formData
    });

    toast.success('Бронювання успішне!');
    setBookedSeats(prev => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
    setFormData({ name: '', phone: '', email: '' });
  };

  const seats = [];

  for (let row = 0; row < rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatId = `${rowLetters[row]}${seat}`;
      seats.push(
        <div
          key={seatId}
          className={`seat 
            ${selectedSeats.includes(seatId) ? 'selected' : ''} 
            ${bookedSeats.includes(seatId) ? 'booked' : ''}
          `}
          onClick={() => toggleSeat(seatId)}
        >
          {seatId}
        </div>
      );
    }
  }

  return (
    <div>
      
      <div className="cinema-hall">{seats}</div>

      <div className="selected-seats">
        <h3>Вибрані місця:</h3>
        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Немає вибраних місць'}
      </div>

      <div className="booking-form">
        <h3>Ваші дані</h3>
        <input
          type="text"
          name="name"
          placeholder="Ім'я"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Телефон"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <button onClick={handleBooking}>Забронювати</button>
      </div>
    </div>
  );
};

export default CinemaHall;
