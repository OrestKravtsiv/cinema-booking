// src/pages/Home.jsx
import { useState } from 'react';
import { movies } from '../data/movies';
import MovieList from '../components/MovieList';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Пошук фільму..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default Home;
