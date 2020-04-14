import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../Footer/FooterComponent';
import Menu from '../Menu/MenuContainer';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: '',
      password: '',
    };
    this.handleChangeLog = this.handleChangeLog.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  componentDidMount() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      const { loadData, loadDataBank } = this.props;
      loadData();
      loadDataBank();
    }
  }

  handleChangeLog(event) {
    this.setState({ log: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const {
      users, login, isAuth,
    } = this.props;
    const { log, password } = this.state;
    const handlerAuthorize = () => {
      users.map((user) => {
        if (user.login === log && user.password === password) login(user.id, log, user.role);
        return (user);
      });
    };

    return isAuth ? (
      <Redirect to="/" />
    ) : (
      <div>
        <div className="header__content">
          <Menu />
        </div>
        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="form">
                  <div className="form__title">
                    SIGN IN
                  </div>
                  <div className="form__subtitle">
                    please enter your login and password
                  </div>
                  <div className="form__arrow">
                    <Icon name="angle down" inverted color="grey" size="large" />
                  </div>
                  <form className="loginForm">
                    <input
                      type="text"
                      className="loginForm__input"
                      placeholder="login"
                      required
                      /* eslint-disable */
                      value={this.state.value}
                      /* eslint-enable */
                      onChange={this.handleChangeLog}
                    />
                    <input
                      type="password"
                      className="loginForm__input"
                      placeholder="password"
                      required
                      /* eslint-disable */
                      value={this.state.value}
                      /* eslint-enable */
                      onChange={this.handleChangePassword}
                    />
                    <button
                      className="loginForm__btn"
                      type="submit"
                      onClick={handlerAuthorize}
                    >
                      ok
                    </button>
                  </form>
                  <Link to="/registration">
                    <div className="form__link">
                      i have not got an account
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

LoginComponent.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
  loadDataBank: PropTypes.func.isRequired,
  users: PropTypes.shape.isRequired,
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.func.isRequired,
};

export default LoginComponent;
