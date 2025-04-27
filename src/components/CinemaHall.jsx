// src/components/CinemaHall.jsx
import { useState } from 'react';
import './CinemaHall.css';

const rows = 5;
const seatsPerRow = 8;

const CinemaHall = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const seats = [];

  for (let row = 1; row <= rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatId = `${row}-${seat}`;
      seats.push(
        <div
          key={seatId}
          className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
          onClick={() => toggleSeat(seatId)}
        >
          {seat}
        </div>
      );
    }
  }

  return (
    <div>
      <div className="cinema-hall">
        {seats}
      </div>
      <div className="selected-seats">
        <h3>Вибрані місця:</h3>
        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Немає вибраних місць'}
      </div>
    </div>
  );
};

export default CinemaHall;
