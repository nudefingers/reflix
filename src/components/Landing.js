import React from 'react';
import { Link } from 'react-router-dom';

function Landing({ users }) {
  return (
    <React.Fragment>
      <h1>Who's watching?</h1>
      <div className="container">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/catalog/${user.id}`}
            // to={`/catalog/user-${user.id}`}
            className="user"
            style={{ backgroundColor: user.color }}
          >
            <p>{user.name}</p>
            <p>${user.balance}</p>
          </Link>
        ))}
      </div>
      <Link to="/add-money" >
          <div className="add-funds">
            <button>Add Money</button>
          </div>
        </Link>
    </React.Fragment>
  );
}

export default Landing;
