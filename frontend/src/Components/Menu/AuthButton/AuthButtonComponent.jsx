import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthButtonComponent = ({
  isAuth, logout, clearCart, setFilter,
}) => (
  isAuth ? (
    <p>
      <Link to="/login">
        <button
          type="button"
          className="auth-button"
          onClick={() => {
            logout();
            clearCart();
            setFilter('all');
          }}
        >
          Sign out
        </button>
      </Link>
    </p>
  ) : (
    <p>
      <Link to="/login">
        <button
          className="auth-button"
          type="button"
        >
          Sign in
        </button>
      </Link>
    </p>
  )
);

AuthButtonComponent.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default AuthButtonComponent;
