import React from 'react';
import { Link } from 'react-router-dom';

function User({ user }) {
  return (
    <Link
      to={`/catalog/${user.id}`}
      className="user"
      style={{ backgroundColor: user.color }}
    >
      <p>{user.name}</p>
      <p>${user.balance}</p>
    </Link>
  );
}

export default User;