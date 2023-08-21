import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="navbar">
      <div className="menu">
        <div className="menu-item">
          <Link to="/" className="menu-link">Home</Link>
        </div>
        <div className="menu-item">
          <Link to="/catalog" className="menu-link">Catalog</Link>
        </div>
      </div>
      <div className="logo">
        <img
          src="https://scontent.fhfa1-1.fna.fbcdn.net/v/t39.30808-6/305201711_443864774435532_7064742077807631681_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZVfpshpTN3QAX9NBgf8&_nc_ht=scontent.fhfa1-1.fna&oh=00_AfAUBzgJYZW4e4Ld-FxFYtCBGMBpR_m3vejxa-KsxDGLJQ&oe=64E8A995"
          alt="Reflix Logo"
          className="logo-image"
        />
      </div>
    </div>
  );
}

export default NavBar;
