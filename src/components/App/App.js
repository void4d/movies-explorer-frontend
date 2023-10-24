import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import { Routes, Route } from 'react-router-dom';
import SideMenu from '../SideMenu/SideMenu';
import { useState } from 'react';

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  function openSideMenu(e) {
    setIsSideMenuOpen(true);
  }

  function closeSideMenu() {
    setIsSideMenuOpen(false);
  }

  const isLoggedIn = true;

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} onClick={openSideMenu} />
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <Footer />
      <SideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
    </div>
  );
}

export default App;
