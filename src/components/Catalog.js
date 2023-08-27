import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Movie from './Movie';

function Catalog({ movies, fetchData, users, toggleSwap, searchTerm, setSearchTerm }) {
  const { userId } = useParams()
  const user = users.find(u => u.id === parseInt(userId))
  const [rentedMovies, setRentedMovies] = useState(user?.rentedMovies || [])

  const handleToggleSwap = (movie, isRented) => {
    toggleSwap(movie, isRented, userId)
  }

  useEffect(() => {
    if (user) {
      setRentedMovies(user.rentedMovies)
    } else {
      setRentedMovies([])
    }
  }, [user])

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={() => fetchData(searchTerm)} />
      </div>
      {userId && user && (
        <React.Fragment>
          <div className="user-balance">
            <h2>{user.name}</h2>
            Butget: ${user.balance}
          </div>
          <div className="container div-with-divider">
            {rentedMovies.map(movie => (
              <Movie key={movie.id} movie={movie} isRented={true} toggleSwap={handleToggleSwap} isUser={!!user} />
            ))}
          </div>
        </React.Fragment>
      )}
      <div className="container">
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} isRented={false} toggleSwap={handleToggleSwap} isUser={!!user} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;