import React, { useEffect, useState } from 'react';
import { FiUser, FiChevronDown } from 'react-icons/fi';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Navbar.css';

const PROFILE_API = 'https://jsonplaceholder.typicode.com/users/1';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(PROFILE_API)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handleProfileClick = () => {
    if (location.pathname !== '/profile') {
      navigate('/profile');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/">
            <img 
              src={"swift_logo.svg"} 
              alt="Swift Logo" 
              className="logo"
            />
          </Link>
        </div>
        <div className="user-profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <div className="user-avatar">
            {user?.name
              ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
              : <FiUser className="user-icon" />}
          </div>
          {user && (
            <span className="user-name">
              {user.name}
              <span className="user-email" style={{ display: 'block', fontSize: '0.8em', color: '#b0b7c3', fontWeight: 400 }}>
                {user.email}
              </span>
            </span>
          )}
          <FiChevronDown className="dropdown-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
