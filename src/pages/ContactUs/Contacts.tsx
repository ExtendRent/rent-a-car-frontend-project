import React from 'react'
import "./ContactUs.css";
import rent from '../../assets/rent.jpg';
import location from '../../assets/location.png';

type Props = {}

const Contacts = (props: Props) => {
  return (
    <div className="contact-container">
      <div className='ortak'>
    <div className="contact-info">
      <h2>BİZE ULAŞIN</h2>
      <p>Her türlü araç ihtiyacınızı karşılamak ve araç kiralama işinizi çevrimiçi platformlarda tanıtmak için buradayız!</p>
      <hr style={{color:'white'}}/>
      <p><strong>Telefon:</strong> (0 216) 656 26 00</p>
      <p><strong>Adres:</strong> Abdi İpekçi Cad. Nişantaşı No:15 </p>
      <p><strong>Mail:</strong> extendRent@gmail.com</p>
    </div>

    <div className="contact-image">
      <img className='rent' src={rent} alt="Contact Image "/> 
    </div>
    </div>

    <div className="contact-cards">
      <div className="card contact">
      
      <h3 className='text' > <i className="lni lni-phone" style={{color:'black'}}></i> BİZE ULAŞ  </h3>
        <p className='text'>(0 216) 656 26 00</p>
        <p className='text'>(0 216) 656 26 01</p>
      </div>
      <div className="card contact location">
        <h3 className='text konum'><i className="lni lni-map-marker" style={{color:'black'}}></i></h3>
        <img className='location-img' src={location} alt="Contact Image"/> 
      </div>
      <div className="card contact">
        <h3 className='text'>ÇALIŞMA SAATLERİ</h3> 
        <p className='text'>Haftaiçi  : 08:00 - 22:00 </p>
        <p className='text'>Haftasonu : 08:00 - 23:00 </p>
      </div>
    </div>
  </div>
  )
}
export default Contacts


