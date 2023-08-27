import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './components/Catalog';
import Users from './components/Users';
import NavBar from './components/NavBar';
import MovieDetail from './components/MovieDetail';
import AddMoney from './components/AddMoney';
import { DEFAULT_USERS, PRICE } from './data/constants';
import { fetchData, updateUserBalance, toggleSwap } from './data/data';


function App() {
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState(DEFAULT_USERS)
  const [searchTerm, setSearchTerm] = useState(``)

  const handleToggleSwap = (movie, isRented, userId) => {
    const user = users.find(u => u.id === parseInt(userId))
    toggleSwap(users, setUsers, movies, setMovies, user, movie, isRented, PRICE)
  }

  const setMovieData = async () => {
    const response = await fetchData(searchTerm)
    setMovies(response)
  }

  useEffect(() => {
    setMovieData()
  }, [])
  

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Users users={users} />} />
        <Route
          path="/catalog"
          element={<Catalog
            movies={movies}
            fetchData={setMovieData}
            users={users}
            toggleSwap={handleToggleSwap}
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} />} />
        <Route
          path="/catalog/:userId"
          element={
            <Catalog
              movies={movies}
              fetchData={setMovieData}
              users={users}
              toggleSwap={handleToggleSwap} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}/>} />
        <Route path="/movie/:movieId" element={<MovieDetail movies={movies} users={users} />} />
        <Route path="/add-money" element={<AddMoney users={users} updateUserBalance={updateUserBalance} />} />
      </Routes>
    </Router>
  );
}

export default App;