import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Movie from './Movie';

function Catalog({ movies, fetchData, users, toggleSwap }) {

  const usersExist = users && users.length > 0  
  const [searchTerm, setSearchTerm] = useState('')
  const [rentedMovies, setRentedMovies] = useState([])
  const { userId } = useParams()
  const isUser = userId || false

  const handleUpdateMovies = () => {
    fetchData(searchTerm)
  }

  const handleToggleSwap = (movie, isRented) => {
    toggleSwap(movie, isRented, userId)
  }
  
  useEffect(() => {
    const user = users.find(u => u.id === parseInt(userId))
    if (user) {
      setRentedMovies(user.rentedMovies)
    } else {
      setRentedMovies([])
    }
  }, [users, userId])


  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies"
        />
        <button className="search-button" onClick={handleUpdateMovies} />
      </div>
      {isUser && usersExist && (
        <React.Fragment>
          <div className="user-balance">
            <h2>{users.find(user => user.id === parseInt(userId)).name}</h2>
            Butget: ${users.find(user => user.id === parseInt(userId)).balance}
          </div>
          <div className="container div-with-divider">
            {rentedMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} isRented={true} toggleSwap={handleToggleSwap} isUser={isUser} />
            ))}
          </div>
        </React.Fragment>
      )}
      <div className="container">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} isRented={false} toggleSwap={handleToggleSwap} isUser={isUser} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;