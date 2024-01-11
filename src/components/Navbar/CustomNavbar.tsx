import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

function CustomNavbar() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/'); 
  };

  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary fixed-top"  >
      <Container>
        
        <Navbar.Brand href="/">
        <button className="logoButton" data-text="Awesome" onClick={handleButtonClick}>
            <span className="actual-text">&nbsp;ExtendRent&nbsp;</span>
            <span aria-hidden="true" className="hover-logo-text">&nbsp;ExtendRent&nbsp;</span>
        </button>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/cars" className="nav-link">Araçlarımız</Link>

            <Link to="/add-product" className="nav-link">Add Product</Link>

            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
             
              <Link to="/action/3.1" className="dropdown-item">Action</Link>
    
            </NavDropdown>
            
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
          </Nav>

          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;