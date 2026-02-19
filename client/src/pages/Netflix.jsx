import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

function Netflix() {
  return (
    <div className="netflix-page">
      <Navbar showLogout={true} />
      <Hero />
      <main className="main-content">
        <MovieRow title="Trending Now" />
        <MovieRow title="Popular on Netflix" />
        <MovieRow title="New Releases" />
        <MovieRow title="Top Rated" />
      </main>
    </div>
  );
}

export default Netflix;
