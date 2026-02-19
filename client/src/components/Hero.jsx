function Hero() {
  const handlePlay = () => {
    alert('Playing Movie...');
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>
      <div className="hero-content">
        <div className="hero-logo">
          <span className="netflix-badge">N</span>
          <span className="series-text">SERIES</span>
        </div>
        <h1 className="hero-title">
          STRANGER THINGS
          <span className="hero-subtitle"> SEASON 4</span>
        </h1>
        <div className="hero-meta">
          <span className="hero-rating">★ 4.8</span>
          <span className="hero-year">2022</span>
          <span className="hero-seasons">4 Seasons</span>
          <span className="hero-hd">HD</span>
        </div>
        <div className="hero-tags">
          <span className="hero-tag">Sci-Fi</span>
          <span className="hero-tag">Horror</span>
          <span className="hero-tag">Drama</span>
        </div>
        <p className="hero-description">
          When a young boy vanishes, a small town uncovers a mystery involving secret experiments, 
          terrifying supernatural forces and one strange little girl.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-play" onClick={handlePlay}>
            <span className="btn-icon">▶</span> Play
          </button>
          <button className="btn btn-info">
            <span className="btn-icon">ℹ</span> More Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
