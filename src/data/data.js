import { API_KEY, URL, MOVIE_AMOUNT, GIPHY_URL, GIPHY_KEY } from './constants';

export const fetchData = async (searchTerm = null) => {
  let finalPath = `${URL}/movie/popular?api_key=${API_KEY}`
  if (searchTerm) {
    finalPath = `${URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`
  }

  try {
    const response = await fetch(finalPath)
    const data = await response.json()

    return data.results.slice(0, MOVIE_AMOUNT)
  } catch (error) {
    console.error(error)
    return []
  }
}


export const generateGiphy = async (movieName = null) => {
  try {
    const response = await fetch(`${GIPHY_URL}${movieName}${GIPHY_KEY}`)
    const data = await response.json()

    return !!data.data[0] ? data.data[0].images.downsized_large.url : ``
  } catch (error) {
    console.error(error)
    return []
  }
}


export const updateUserBalance = (users, userId, amount) => {
  return users.map(user =>
    user.id === userId ? { ...user, balance: user.balance + amount } : user
  )
}


export const toggleSwap = (users, setUsers, movies, setMovies, user, movie, isRented, price, setShowModal, setRentedMovieName) => {
    if (!user) {
      return
    }
  
    let updatedUsers = [...users]
    let updatedMovies = [...movies]
  
    if (!isRented && user.balance >= price) {
      const updatedRentedMovies = [...user.rentedMovies, movie]
      const updatedUser = { ...user, rentedMovies: updatedRentedMovies, balance: user.balance - price }
      updatedUsers = users.map(u => (u.id === user.id ? updatedUser : u))
      updatedMovies = movies.filter(m => m !== movie)
      setShowModal(true)
      setRentedMovieName(movie.title)
    }
  
    if (isRented) {
      const updatedRentedMovies = user.rentedMovies.filter(m => m.id !== movie.id)
      const updatedUser = { ...user, rentedMovies: updatedRentedMovies, balance: user.balance + price }
      updatedUsers = users.map(u => (u.id === user.id ? updatedUser : u))
      updatedMovies = [...movies, movie]
    }
  
    setUsers(updatedUsers)
    setMovies(updatedMovies)
  }
  