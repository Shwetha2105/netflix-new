import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ showLogout = false }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    phone: '',
    bio: ''
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Get user from localStorage
    const userData = localStorage.getItem('netflix_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditForm({
        username: parsedUser.username || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        bio: parsedUser.bio || ''
      });
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('netflix_user');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...editForm };
    localStorage.setItem('netflix_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowEditModal(false);
    alert('Profile updated successfully!');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <h1 className="logo">NETFLIX</h1>
          {showLogout && (
            <ul className="nav-links">
              <li><a href="#" className="nav-link">Home</a></li>
              <li><a href="#" className="nav-link">TV Shows</a></li>
              <li><a href="#" className="nav-link">Movies</a></li>
              <li><a href="#" className="nav-link">New & Popular</a></li>
              <li><a href="#" className="nav-link">My List</a></li>
            </ul>
          )}
        </div>
        <div className="navbar-right">
          {showLogout && user ? (
            <div className="user-profile-container" ref={dropdownRef}>
              <div 
                className="user-profile" 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="username">{user.username}</span>
                <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
              </div>
              
              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="dropdown-user-info">
                      <h4>{user.username}</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-credentials">
                    <div className="credential-item">
                      <span className="credential-label">Username:</span>
                      <span className="credential-value">{user.username}</span>
                    </div>
                    <div className="credential-item">
                      <span className="credential-label">Email:</span>
                      <span className="credential-value">{user.email}</span>
                    </div>
                    <div className="credential-item">
                      <span className="credential-label">Phone:</span>
                      <span className="credential-value">{user.phone || 'Not provided'}</span>
                    </div>
                    {user.bio && (
                      <div className="credential-item">
                        <span className="credential-label">Bio:</span>
                        <span className="credential-value">{user.bio}</span>
                      </div>
                    )}
                  </div>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-btn edit-btn"
                    onClick={() => {
                      setShowDropdown(false);
                      setShowEditModal(true);
                    }}
                  >
                    ✏️ Complete Profile
                  </button>
                  <button className="dropdown-btn logout-btn-dropdown" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <span className="nav-icon">Search</span>
              <span className="nav-icon">Notifications</span>
              <span className="nav-icon">Profile</span>
            </>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Complete Your Profile</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleEditChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="form-input"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleEditChange}
                  className="form-input textarea"
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
