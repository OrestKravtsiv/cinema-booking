// /src/App.js
import { useState } from 'react';
import { movies as moviesData } from './data/movies';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = moviesData.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Кінотеатр</h1>
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
}

export default App;
