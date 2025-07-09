import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { FaEnvelope, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

const PROFILE_API = 'https://jsonplaceholder.typicode.com/users';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(PROFILE_API)
      .then((res) => res.json())
      .then((data) => setUser(data[0]))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="profile-wrapper">
          <div className="profile-card premium">
            <p className="loading-text">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        <div className="profile-card premium">
          <p className="profile-welcome">Welcome back, {user.name.split(' ')[0]} 👋</p>
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>
            <div className="profile-header-info">
              <h1>{user.name}</h1>
              <p className="username">@{user.username}</p>
              <p className="tagline">{user.company?.catchPhrase}</p>
            </div>
          </div>

          <div className="profile-section-grid">
            <div className="profile-section">
              <h3><FaEnvelope /> Contact</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
            </div>

            <div className="profile-section">
              <h3><FaMapMarkerAlt /> Address</h3>
              <p>{user.address?.suite}</p>
              <p>{user.address?.street}</p>
              <p>{user.address?.city} - {user.address?.zipcode}</p>
            </div>

            <div className="profile-section">
              <h3><FaBuilding /> Company</h3>
              <p><strong>Name:</strong> {user.company?.name}</p>
              <p><strong>Business:</strong> {user.company?.bs}</p>
              <p><strong>Tagline:</strong> <em>{user.company?.catchPhrase}</em></p>
            </div>
          </div>

          <button className="btn" onClick={() => navigate('/')}>← Back to Dashboard</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
