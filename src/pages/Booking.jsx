// src/pages/Booking.jsx
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === Number(id));

  if (!movie) {
    return <div>Фільм не знайдено</div>;
  }

  return (
    <div>
      <h2>Бронювання: {movie.title}</h2>
      <CinemaHall />
    </div>
  );
};

export default Booking;
