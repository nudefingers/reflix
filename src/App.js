import './App.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './components/Catalog';
import Users from './components/Users';
import NavBar from './components/NavBar';
import MovieDetail from './components/MovieDetail';
import AddMoney from './components/AddMoney';
import { DEFAULT_USERS, PRICE } from './data/constants';
import { fetchData, updateUserBalance, toggleSwap, generateGiphy } from './data/data';


function App() {
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState(DEFAULT_USERS)
  const [searchTerm, setSearchTerm] = useState(``)
  const [rentedMovieName, setRentedMovieName] = useState(``)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [giphy, setGiphy] = useState(``)

  const closeModal = () => {
    setGiphy(``)
    setModalIsOpen(false)
  }

  const handleToggleSwap = (movie, isRented, userId) => {
    const user = users.find(u => u.id === parseInt(userId))
    toggleSwap(users, setUsers, movies, setMovies, user, movie, isRented, PRICE, setModalIsOpen, setRentedMovieName)
    if (setModalIsOpen) {
      getGiphy()    
    }
  }

  const getGiphy = async () => {
    const response = await generateGiphy(rentedMovieName)
    setGiphy(response)
  }

  const setMovieData = async () => {
    const response = await fetchData(searchTerm)
    setMovies(response)
  }

  useEffect(() => {
    setMovieData()
  }, [])
  
  useEffect(() => {
    getGiphy()    
  }, [rentedMovieName, modalIsOpen])

  useEffect(() => {
    getGiphy()    
  }, [])


  const modalContent = (
    <div>
      <h4>Rented {rentedMovieName} Sucessfully!</h4>
      <img src={giphy} />
      <br />
      <button onClick={closeModal}>
        Close
      </button>
    </div>
  )


  return (
    <Router>
      <NavBar />
      <Modal isOpen={modalIsOpen} 
             onRequestClose={closeModal}
             ariaHideApp={false}
             className="modal">
        {modalContent}
      </Modal>
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
              setSearchTerm={setSearchTerm} />} />
        <Route path="/movie/:movieId" element={<MovieDetail movies={movies} users={users} />} />
        <Route path="/add-money" element={<AddMoney users={users} updateUserBalance={updateUserBalance} />} />
      </Routes>
    </Router>
  );
}

export default App;