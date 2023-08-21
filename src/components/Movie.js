import React from 'react';
import { Link } from 'react-router-dom';

function Movie({ movie, isRented, toggleSwap, isUser }) {
    return (
        <div key={movie.id} className="movie-container">
            <Link to={`/movie/${movie.id}`} className="movie-link">
                <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
            </Link>
            {isUser && (
            <button
                className="swap-button"
                onClick={() => toggleSwap(movie, isRented)}>
                {isRented ? "-" : "+"}
            </button>
            )}
        </div>
    );
}

export default Movie;