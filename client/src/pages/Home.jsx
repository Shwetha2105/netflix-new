import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <div className="home-background">
        <div className="home-overlay"></div>
      </div>
      <div className="home-content">
        <h1 className="home-logo">NETFLIX</h1>
        <h2 className="home-title">Unlimited movies, TV shows, and more</h2>
        <p className="home-subtitle">Watch anywhere. Cancel anytime.</p>
        <div className="home-buttons">
          <Link to="/login" className="btn btn-primary">
            Sign In
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
