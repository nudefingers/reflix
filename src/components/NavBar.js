import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.jpg';

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/catalog', label: 'Catalog' }
]

function NavBar() {
  return (
    <div className="navbar">
      <div className="menu">
        {menuItems.map((menuItem, index) => (
          <div key={index} className="menu-item">
            <Link to={menuItem.path} className="menu-link">
              {menuItem.label}
            </Link>
          </div>
        ))}
      </div>
      <div className="logo">
        <img src={logo} alt="Reflix Logo" className="logo-image" />
      </div>
    </div>
  );
}

export default NavBar;
