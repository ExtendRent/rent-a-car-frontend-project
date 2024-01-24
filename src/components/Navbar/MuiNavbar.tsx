import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./MuiNavbar.css";
import logo from '../../assets/logo4.png';
import Spline from '@splinetool/react-spline';
type Props = {}

function MuiNavbar() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/');
    };
    
  return (
    <div className="navbar-wrapper">
      <div className="spline-container">
       {/*  <Spline
          scene="https://prod.spline.design/xe7Nf6HEYx5HFO5L/scene.splinecode"
          style={{ width: '100%', height: '100%', position: 'relative',pointerEvents: 'none' }} draggable={true}
        /> */}
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ position: 'absolute', top: 0, zIndex: 1, width: '100%', background: 'transparent' }}>
          <Link to="/" className="navbar-brand">
            {/* <img src={logo} alt="Logo" className="logo" width={550}/> */}
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
              <Link to="/alan1" className="nav-item nav-link">
                Alan 1
              </Link>
              <Link to="/alan2" className="nav-item nav-link">
                Alan 2
              </Link>
              <Link to="/alan3" className="nav-item nav-link">
                Alan 3
              </Link>
            </div>
            <div className="navbar-nav ml-auto">
              <Link to="/login" className="nav-item nav-link">
                Giriş Yap
                <img src="araba-icon.png" alt="Araba" className="car-icon" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MuiNavbar