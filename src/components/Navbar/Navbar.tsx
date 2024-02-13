import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser } from 'react-icons/fa';
import './Navbar.css';
import useToken from '../../utils/useToken';
import UserProfileDropdown from './UserProfileDropdown';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const { token, decodedToken, updateToken, clearToken } = useToken();

  const logout = () => {
    // logout işlemi buraya eklenecek
  };

  return (
    <nav className={`navbar ${dropdownActive ? 'dropdown-open' : ''}`}>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo'>
          ExtendRent
        </Link>
        <div className='menu-icon' onClick={toggleMenu}>
          <FaBars />
        </div>
        <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
          {!decodedToken?.role?.some(role => role === 'CUSTOMER') && (
            <li className='nav-item'>
              <Link to='/' className='nav-links'>
                Ana Sayfa
              </Link>
            </li>
          )}
          <li className='nav-item'>
            <Link to='/adminPanel' className='nav-links'>
              Admin Panel
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/rotalar' className='nav-links'>
              Rotalar
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/rehberlerimiz' className='nav-links'>
              Rehberlerimiz
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/iletisim' className='nav-links'>
              İletişim
            </Link>
          </li>
          {!decodedToken?.id && (
          <li className='nav-item nav-item-right'>
            <Link to='/login' className='nav-links nav-links-btn'>
              Giriş Yap
            </Link>
          </li>
          )}
          {!decodedToken?.id && (
            <li className='nav-item nav-item-right'>
              <Link to='/signup' className='nav-links nav-links-btn'>
                Üye Ol
              </Link>
            </li>
          )}
          {decodedToken?.id && (
          <li className='nav-item nav-item-right'>
            <div className="user-profile-dropdown">
            
              <UserProfileDropdown />
            </div>
          </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;