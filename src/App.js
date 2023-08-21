import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './components/Catalog';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import MovieDetail from './components/MovieDetail';
import AddMoney from './components/AddMoney';

function App() {
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([
    { id: 0, name: 'Mother', color: 'yellow', balance: 10, rentedMovies: [] },
    { id: 1, name: 'Father', color: 'Lime', balance: 100, rentedMovies: [] },
    { id: 2, name: 'Sister', color: 'pink', balance: 5, rentedMovies: [] },
    { id: 3, name: 'Brother', color: 'aqua', balance: 5, rentedMovies: [] }
  ])
  const PRICE = 5

  const fetchData = async (searchTerm = null) => {
    const API_KEY = `218e14a935b03491dddeb8e1ffb3e651`
    const URL = `https://api.themoviedb.org/3`
    const MOVIE_AMOUNT = 10

    let endpoint = `${URL}/movie/popular?api_key=${API_KEY}`
    if (searchTerm) {
      endpoint = `${URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`
    }

    try {
      const response = await fetch(endpoint)
      const data = await response.json()
      //   setMovies(endpoint ? data.results.slice(0, MOVIE_AMOUNT) : data.results)
      setMovies(data.results.slice(0, MOVIE_AMOUNT))
    } catch (error) {
      console.error(error)
      setMovies([])
    }
  }

  const toggleSwap = (movie, isRented, userId) => {
    const user = users.find(u => u.id === parseInt(userId))

    if (!user) {
      return
    }

    if (!isRented && user.balance >= PRICE) {
      setMovies(prevMovies => prevMovies.filter(m => m !== movie));

      const updatedRentedMovies = [...user.rentedMovies, movie];
      const updatedUser = { ...user, rentedMovies: updatedRentedMovies, balance: user.balance - PRICE };
      const updatedUsers = users.map(u => (u.id === user.id ? updatedUser : u));

      setUsers(updatedUsers);
    }

    if (isRented) {
      setMovies(prevMovies => [...prevMovies, movie]);

      const updatedRentedMovies = user.rentedMovies.filter(m => m.id !== movie.id);
      const updatedUser = { ...user, rentedMovies: updatedRentedMovies, balance: user.balance + PRICE };
      const updatedUsers = users.map(u => (u.id === user.id ? updatedUser : u));

      setUsers(updatedUsers);
    }
  }

  const updateUserBalance = (userId, amount) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          return { ...user, balance: user.balance + amount }
        }
        return user
      })
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing users={users} />} />
        <Route
          path="/catalog"
          element={<Catalog
            movies={movies}
            fetchData={fetchData}
            users={users}
            toggleSwap={toggleSwap} />} />
        <Route
          path="/catalog/:userId"
          element={
            <Catalog
              movies={movies}
              fetchData={fetchData}
              users={users}
              toggleSwap={toggleSwap} />} />
        <Route path="/movie/:movieId" element={<MovieDetail movies={movies} users={users} />} />
        <Route path="/add-money" element={<AddMoney users={users} updateUserBalance={updateUserBalance} />} />
      </Routes>
    </Router>
  );
}

export default App;