import { useRef } from 'react';

// Movie data with actual movie poster images from TMDB
const moviesData = {
  trending: [
    { id: 1, title: "The Witcher", image: "https://image.tmdb.org/t/p/w300/7vjaCdMw15FEbXyLQTVa04URsPm.jpg", rating: "8.1" },
    { id: 2, title: "Stranger Things", image: "https://image.tmdb.org/t/p/w300/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", rating: "8.6" },
    { id: 3, title: "Money Heist", image: "https://image.tmdb.org/t/p/w300/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg", rating: "8.3" },
    { id: 4, title: "Squid Game", image: "https://image.tmdb.org/t/p/w300/dDlEmu3EZ0Pgg93KZSV31U1K8U5.jpg", rating: "7.8" },
    { id: 5, title: "Wednesday", image: "https://image.tmdb.org/t/p/w300/9PFonBhy4cQy7Jz20NpMygczOkv.jpg", rating: "8.4" },
    { id: 6, title: "The Last of Us", image: "https://image.tmdb.org/t/p/w300/uKvVjHNqB5VmktDXNqmA9NdTPy.jpg", rating: "8.8" },
    { id: 7, title: "The Mandalorian", image: "https://image.tmdb.org/t/p/w300/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg", rating: "8.5" },
    { id: 8, title: "Breaking Bad", image: "https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", rating: "9.5" },
  ],
  popular: [
    { id: 9, title: "The Dark Knight", image: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: "9.0" },
    { id: 10, title: "Inception", image: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", rating: "8.8" },
    { id: 11, title: "Interstellar", image: "https://image.tmdb.org/t/p/w300/gEU2QniL6C8z19uVOtYnZ5UYj42.jpg", rating: "8.7" },
    { id: 12, title: "The Matrix", image: "https://image.tmdb.org/t/p/w300/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", rating: "8.2" },
    { id: 13, title: "Avengers: Endgame", image: "https://image.tmdb.org/t/p/w300/or06FN3Dka5tukK1e9sl16pB3iy.jpg", rating: "8.4" },
    { id: 14, title: "Spider-Man: No Way Home", image: "https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", rating: "8.0" },
    { id: 15, title: "Black Panther", image: "https://image.tmdb.org/t/p/w300/uxzzxijgPIY7slzFvMotPv8wjKA.jpg", rating: "7.5" },
    { id: 16, title: "Iron Man", image: "https://image.tmdb.org/t/p/w300/78lPtwv72eTNqFW9COBYI0dWDJa.jpg", rating: "7.9" },
  ],
  newReleases: [
    { id: 17, title: "Oppenheimer", image: "https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", rating: "8.2" },
    { id: 18, title: "Barbie", image: "https://image.tmdb.org/t/p/w300/iuFNMS8U5cb6xfzi51DbkovjHvE.jpg", rating: "7.0" },
    { id: 19, title: "Mission: Impossible", image: "https://image.tmdb.org/t/p/w300/NNxYkU70HPurnNCSiCjYAmacwm.jpg", rating: "7.8" },
    { id: 20, title: "Guardians of the Galaxy", image: "https://image.tmdb.org/t/p/w300/r2J02Z2OpVRv2OvDVGyRwkw4nAu.jpg", rating: "8.0" },
    { id: 21, title: "Fast X", image: "https://image.tmdb.org/t/p/w300/1E5baAaEse26fej7uHcjOgEE2t2.jpg", rating: "7.0" },
    { id: 22, title: "John Wick 4", image: "https://image.tmdb.org/t/p/w300/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", rating: "7.8" },
    { id: 23, title: "The Flash", image: "https://image.tmdb.org/t/p/w300/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg", rating: "6.8" },
    { id: 24, title: "Transformers", image: "https://image.tmdb.org/t/p/w300/gPbM0MK8CP8A174rmUwGsADNYKD.jpg", rating: "7.2" },
  ],
  topRated: [
    { id: 25, title: "The Shawshank Redemption", image: "https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", rating: "9.3" },
    { id: 26, title: "The Godfather", image: "https://image.tmdb.org/t/p/w300/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", rating: "9.2" },
    { id: 27, title: "The Dark Knight", image: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: "9.0" },
    { id: 28, title: "Pulp Fiction", image: "https://image.tmdb.org/t/p/w300/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", rating: "8.9" },
    { id: 29, title: "Fight Club", image: "https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", rating: "8.8" },
    { id: 30, title: "Forrest Gump", image: "https://image.tmdb.org/t/p/w300/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", rating: "8.8" },
    { id: 31, title: "Inception", image: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", rating: "8.8" },
    { id: 32, title: "The Matrix", image: "https://image.tmdb.org/t/p/w300/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", rating: "8.7" },
  ]
};

function MovieRow({ title }) {
  const rowRef = useRef(null);
  
  // Select movies based on row title
  let movies = moviesData.trending;
  if (title === "Popular on Netflix") movies = moviesData.popular;
  else if (title === "New Releases") movies = moviesData.newReleases;
  else if (title === "Top Rated") movies = moviesData.topRated;

  return (
    <section className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-row-container" ref={rowRef}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img 
              src={movie.image} 
              alt={movie.title} 
              className="movie-card-image"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=' + encodeURIComponent(movie.title);
              }}
            />
            <div className="movie-card-overlay">
              <h3 className="movie-card-title">{movie.title}</h3>
              <span className="movie-card-rating">★ {movie.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
