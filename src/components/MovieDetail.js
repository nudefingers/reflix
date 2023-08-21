import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail({ movies, users }) {
    const { movieId } = useParams()
    let movie = movies.find(m => m.id.toString() === movieId)

    const releaseDate = movie.release_date
    let formattedDate = "Unknown"
    if (releaseDate) {
        const options = { year: 'numeric' }
        formattedDate = new Date(releaseDate).toLocaleDateString('en-EN', options)
    }

    if (!movie) {
        for (const user of users) {
            let rentedMovie = user.rentedMovies.find(m => m.id.toString() === movieId)
            if (rentedMovie) {
                movie = rentedMovie
                break
            }
        }
    }

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