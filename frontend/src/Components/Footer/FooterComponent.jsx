import React from 'react';
import { Link } from 'react-router-dom';
import logo from './img/logoFooter.png';

const FooterComponent = () => (
  <section id="footer" className="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Link to="/">
            <img className="footer__logo" alt="logo" src={logo} width="120" height="120" />
          </Link>
        </div>
        <div className="col-md-7">
          <div className="footer__menu clearfix">
            <a href="/">
              <div className="item">
                Home
              </div>
            </a>
            <a href="/shop">
              <div className="item">
                Shop
              </div>
            </a>
            <a href="/">
              <div className="item">
                Team
              </div>
            </a>
            <a href="/">
              <div className="item">
                About us
              </div>
            </a>
            <a href="/">
              <div className="item">
                Contacts
              </div>
            </a>
          </div>
        </div>
        <div className="col-md-2">
          <div className="social clearfix">
            <a href="/">
              <div className="social__icon_facebook" />
            </a>
            <a href="/">
              <div className="social__icon_twitter" />
            </a>
            <a href="/">
              <div className="social__icon_google" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FooterComponent;
