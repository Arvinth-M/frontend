import React from 'react';

const Profile = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <h2>User Profile</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="profile-content">
          <div className="profile-field">
            <strong>User ID:</strong> {user.userId}
          </div>
          
          <div className="profile-field">
            <strong>Name:</strong> {user.name}
          </div>
          
          <div className="profile-field">
            <strong>Email:</strong> {user.email}
          </div>
          
          <div className="profile-field">
            <strong>Address:</strong> {user.address}
          </div>
          
          <div className="profile-field">
            <strong>Country:</strong> {user.country}
          </div>
          
          <div className="profile-field">
            <strong>Pin Code:</strong> {user.pinCode}
          </div>
          
          <div className="profile-field">
            <strong>Sex:</strong> {user.sex}
          </div>
          
          <div className="profile-field">
            <strong>Languages:</strong> {user.language.join(', ')}
          </div>
          
          {user.about && (
            <div className="profile-field">
              <strong>About:</strong> {user.about}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
