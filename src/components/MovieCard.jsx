// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p><strong>Жанр:</strong> {movie.genre}</p>
      <p><strong>Сеанс:</strong> {movie.time}</p>
      <Link to={`/booking/${movie.id}`}>
        <button className="book-button">Забронювати</button>
      </Link>
    </div>
  );
};

export default MovieCard;
