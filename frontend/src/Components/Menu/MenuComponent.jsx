import React from 'react';
import {
  Popup, Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import logo from './img/logo.png';
import AuthButton from './AuthButton/AuthButtonContainer';
import CartComponent from './Cart/CartContainer';

const MenuComponent = ({
  totalPrice, count, items, log, role, clearCart, setFilter,
}) => (
  <div>
    <div className="container">
      <div className="row">
        <div className="col-md-1 text-center">
          <a href="/">
            <div className="menuIcon" />
          </a>
        </div>
        <div className="col-md-2 text-center">
          <Link to="/">
            <img className="menu__logo" alt="logo" src={logo} width="120" height="120" />
          </Link>
        </div>
        <div className="col-md-6">
          <div className="menu clearfix">
            <Link to="/calorie">
              <div className="menu__item">
                Калорийность
              </div>
            </Link>
            <Link to="/shop">
              <div className="menu__item">
                Магазин
              </div>
            </Link>
            <Link to="/recipes">
              <div className="menu__item">
                Рецепты
              </div>
            </Link>
            {role !== null
              ? (
                <>
                  <Link to="/account">
                    <div className="menu__item">
                      Профиль
                    </div>
                  </Link>
                  <Link to="/bank">
                    <div className="menu__item">
                      Банк
                    </div>
                  </Link>
                </>
              ) : (
                ''
              )}
            {role === 'admin'
              ? (
                <Link to="/users">
                  <div className="menu__item">
                    Пользователи
                  </div>
                </Link>
              ) : (
                ''
              )}
          </div>
        </div>
        <div className="col-md-2">
          <div className="cart clearfix">
            <Popup
              trigger={
                (
                  <div>
                    <div className="cart__icon">
                      <i className="fas fa-shopping-cart" />
                    </div>
                    <div className="cart__text">CART</div>
                    <div className="cart__counter">{count}</div>
                  </div>
                )
                }
              header={
                (
                  <p>
                    {totalPrice}
                    <Icon name="dollar sign" />
                  </p>
              )
              }
              content={
                  uniqBy(items, (o) => o.id).map((product) => (
                    <CartComponent
                      id={product.id}
                      title={product.title}
                      picture={product.picture}
                      items={items}
                    />
                  ))
                }
              on="click"
              hideOnScroll
              position="bottom center"
              offset="0, 40px"
            />
          </div>
        </div>
        <div className="col-md-1 text-center">
          <div className="role__text">{log}</div>
          <AuthButton clearCart={clearCart} setFilter={setFilter} />
        </div>
      </div>
    </div>
  </div>
);

MenuComponent.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  items: PropTypes.shape.isRequired,
  log: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  clearCart: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default MenuComponent;
