import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user by email
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        // Store login state in localStorage
        localStorage.setItem('netflix_user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/netflix');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-overlay"></div>
      </div>
      <div className="auth-container">
        <Link to="/" className="auth-logo">NETFLIX</Link>
        <div className="auth-form-container">
          <h2 className="auth-title">Sign In</h2>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="btn btn-submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p className="auth-switch">
            New to Netflix? <Link to="/register">Sign Up Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
