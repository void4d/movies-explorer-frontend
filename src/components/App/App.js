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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  function openSideMenu(e) {
    setIsSideMenuOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeSideMenu() {
    setIsSideMenuOpen(false);
    document.body.style.overflow = 'unset';
  }

  const isLoggedIn = true;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onClick={openSideMenu} />
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          <Route path="/movies" element={<ProtectedRoute component={Movies} isLoggedIn={isLoggedIn} />} />
          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} isLoggedIn={isLoggedIn} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <Footer />
        <SideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
