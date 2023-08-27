import React from 'react';
import { useParams } from 'react-router-dom';

function formatDate(dateString) {
  if (!dateString) {
    return "Unknown"
  }

  const options = { year: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-EN', options)
}

function findMovieById(movies, movieId) {
  return movies.find(movie => movie.id.toString() === movieId)
}

function findRentedMovieById(users, movieId) {
  for (const user of users) {
    const rentedMovie = user.rentedMovies.find(movie => movie.id.toString() === movieId)
    if (rentedMovie) {
      return rentedMovie
    }
  }
  return null
}

function MovieDetail({ movies, users }) {
  const { movieId } = useParams()
  let movie = findMovieById(movies, movieId) || findRentedMovieById(users, movieId)

  const releaseDate = movie.release_date
  const formattedDate = formatDate(releaseDate)

  const trailerUrl = movie.video

  return (
    <div className="movie-details" key={movie.id}>
      <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <h2>{formattedDate}</h2>
      <p>{movie.overview}</p>
      {trailerUrl && (
        <iframe
          width="560"
          height="315"
          src={trailerUrl}
          title={`${movie.title} Trailer`}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default MovieDetail;
