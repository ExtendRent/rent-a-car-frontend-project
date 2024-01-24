import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./NewNavbar.css";
import logo from '../../assets/logo4.png';
import Spline from '@splinetool/react-spline';
type Props = {}

function Navbar() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/');
    };
    
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <Link to="/adminPanel" className="nav-link">Admin Panel</Link>
        </div>
        <div className="navbar-nav ml-auto">
          <Link to="/login" className="nav-item nav-link">
            Giriş Yap
          </Link>
          <Link to="/signup" className="nav-item nav-link">
            Üye Ol
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar