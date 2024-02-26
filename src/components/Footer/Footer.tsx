import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
interface FooterProps {

}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-col">
          <h4>Kurumsal</h4>
          <ul>
            <li><Link to='/about' className='nav-links'>
              Hakkımızda
            </Link></li>
            <li><Link to='/contact' className='nav-links'>
              İletişim
            </Link></li>
            <li><Link to='/contact' className='nav-links'>
              İnsan Kaynakları
            </Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Gizlilik Politikası</h4>
          <ul>
            <li><Link to='/rentalTerm' className='nav-links'>
              Çerez Politikası
            </Link></li>
            <li><Link to='/rentalTerm' className='nav-links'>
              Kiralama Koşulları
            </Link></li>
            <li><Link to='/rentalTerm' className='nav-links'>
              KVKK Aydınlatma Metni
            </Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Bizi Takip Edin</h4>
          <div className="social-links">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;