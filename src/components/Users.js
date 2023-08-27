import React from 'react';
import { Link } from 'react-router-dom';
import User from './User';

function Users({ users }) {
    return (
      <React.Fragment>
        <h1>Who's watching?</h1>
        <div className="container">
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
        <Link to="/add-money">
          <div className="add-funds">
            <button>Add Money</button>
          </div>
        </Link>
      </React.Fragment>
    );
  }
  
  export default Users;