import React from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const HomePage = () => {
  const navigate = useNavigate();
  const secretkey = import.meta.env.VITE_SECRET_KEY;
  const encryptedUser = localStorage.getItem('currentUser');
  const bytes = CryptoJS.AES.decrypt(encryptedUser, secretkey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  const user = JSON.parse(decrypted);
  if (user) {
    console.log(user.username);
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/signin');
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold underline">Home Page</h1>

      {user ? (
        <div className='user-card'>
          <p className='user-name'>Welcome, {user.username}</p>
          <p className='mobile-no'>{user.mobile}</p>
          <button
          className='p-3'
            type="button"
            onClick={handleLogout}
            
          >
            Logout
          </button>
        </div>
      ) : (
        <div className='user-card'>
          <p>Not logged in</p>
          <button
          className='homepage-button'
            type="button"
            onClick={() => navigate('/signin')}
            
          >
            Sign In
          </button>
          
        </div>
      )}
    </div>
  );
};

export default HomePage;
