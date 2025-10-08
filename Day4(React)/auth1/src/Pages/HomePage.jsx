import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (user) {
    console.log(user.username);
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold underline">Home Page</h1>

      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
          <p>Welcome, {user.mobile}</p>
        </div>
      ) : (
        <div>
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
