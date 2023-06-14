import React, { useState } from 'react';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFound, setUserFound] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/users?search=${searchTerm}`);
      const data = await response.json();
      setUserFound(data.exists);
    } catch (error) {
      console.error('Error searching for user:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a user"
      />
      <button onClick={handleSearch}>Search</button>
      {userFound ? <p>User found!</p> : <p>User not found.</p>}
    </div>
  );
};

export default UserSearch;
