import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Footer from '../Footer/FooterComponent';
import Menu from '../Menu/MenuContainer';

const validEmailRegex = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/);

const validateForm = function checkErrors(errors, fields) {
  let valid = true;
  Object.values(fields).forEach((val) => {
    if (!val) valid = false;
  });
  Object.values(errors).forEach((val) => {
    if (val.length > 0) valid = false;
  });
  return valid;
};

class RegistrationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      fields: {
        log: null,
        fullName: null,
        email: null,
        password: null,
        surname: null,
        confirmPass: null,
      },
      errors: {
        fullName: '',
        password: '',
        email: '',
        log: '',
        surname: '',
        confirmPass: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      const { loadData } = this.props;
      loadData();
    }
  }

  handleSubmit(event) {
    const { errors, fields } = this.state;
    const {
      password, fullName, surname, email, log,
    } = fields;
    const { addUser, login, addBank } = this.props;
    const user = {
      id: Math.floor(Math.random() * (200 - 20)) + 200,
      'first name': fullName,
      'last name': surname,
      'e-mail': email,
      'remove request': false,
      login: log,
      password,
      role: 'user',
    };
    event.preventDefault();
    if (validateForm(errors, fields)) {
      const s = '0123456789';
      const number = Array(10).join().split(',').map(() => s.charAt(Math.floor(Math.random() * s.length)))
        .join('');
      const csv = Array(3).join().split(',').map(() => s.charAt(Math.floor(Math.random() * s.length)))
        .join('');
      const newBank = {
        id: Math.floor(Math.random() * (200 - 20)) + 200,
        card_number: number,
        csv: parseFloat(csv),
        balance: 1000,
      };
      addBank(newBank);
      const newUser = {
        id: user.id,
        name: user['first name'],
        surname: user['last name'],
        login: user['e-mail'],
        'remove request': false,
        patronymic: log,
        password,
        role: 'user',
        account_id: newBank.id,
      };
      addUser(newUser);
      login(user.id, newUser.Name, user.role, newBank.id);
      this.setState({ redirect: true });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const {
      errors, fields,
    } = this.state;
    const {
      password, confirmPass,
    } = fields;
    switch (name) {
      case 'fullName':
        errors.fullName = value.length < 5 ? 'Имя должно быть не короче 5-и символов' : '';
        break;
      case 'surname':
        errors.surname = value.length < 5 ? 'Фамилия должна быть не короче 5-и символов' : '';
        break;
      case 'log':
        errors.log = value.length < 5 ? 'Логин должен быть не короче 5-и символов' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Невалидный e-mail';
        break;
      case 'password':
        errors.password = value.length < 8 ? 'Пароль должен быть не короче 8-и символов' : '';
        errors.confirmPass = value !== confirmPass ? 'Пароли должны совпадать' : '';
        break;
      case 'confirmPass':
        errors.confirmPass = value !== password ? 'Пароли должны совпадать' : '';
        break;
      default:
        break;
    }
    fields[name] = value;
    this.setState({ errors, fields });
  }

  render() {
    const {
      errors, fields, redirect,
    } = this.state;
    const {
      fullName, password, email, log, surname,
    } = fields;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="header__content">
          <Menu />
        </div>
        <section id="login">
          <form noValidate>
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="form__title">
                    registration
                  </div>
                  <div className="form__subtitle">
                    please enter your details
                  </div>
                  <div className="form__arrow">
                    <Icon name="angle down" inverted color="grey" size="large" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="regForm">
                    <div className="form__subtitle">
                      login information
                    </div>
                    <div className="loginForm">
                      <input
                        name="email"
                        placeholder="login"
                        onChange={this.handleChange}
                        className="loginForm__input"
                        noValidate
                      />
                      <div className="form__message">
                        {errors.email.length && email.length ? (
                          <p className="error">{errors.email}</p>
                        ) : ''}
                      </div>
                      <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        className="loginForm__input"
                        placeholder="password"
                        noValidate
                      />
                      <div className="form__message">
                        {errors.password.length && password.length ? (
                          <p className="error">{errors.password}</p>
                        ) : ''}
                      </div>
                      <input
                        type="password"
                        name="confirmPass"
                        onChange={this.handleChange}
                        className="loginForm__input"
                        placeholder="confirm password"
                        noValidate
                      />
                      <div className="form__message">
                        {errors.confirmPass.length ? (
                          <p className="error">{errors.confirmPass}</p>
                        ) : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="regForm">
                    <div className="form__subtitle">
                      contact information
                    </div>
                    <div className="loginForm">
                      <input
                        name="fullName"
                        onChange={this.handleChange}
                        className="loginForm__input"
                        placeholder="first name"
                        noValidate
                      />
                      <div className="form__message">
                        {errors.fullName.length && fullName.length ? (
                          <p className="error">{errors.fullName}</p>
                        ) : ''}
                      </div>
                      <input
                        className="loginForm__input"
                        placeholder="last name"
                        name="surname"
                        required
                        onChange={this.handleChange}
                      />
                      <div className="form__message">
                        {errors.surname.length && surname.length ? (
                          <p className="error">{errors.surname}</p>
                        ) : ''}
                      </div>
                      <input
                        className="loginForm__input"
                        placeholder="Patronymic"
                        name="log"
                        required
                        onChange={this.handleChange}
                      />
                      <div className="form__message">
                        {errors.log.length && log.length ? (
                          <p className="error">{errors.log}</p>
                        ) : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <button
                    className="regForm__btn"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
        <Footer />
      </div>
    );
  }
}

RegistrationComponent.propTypes = {
  addUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  addBank: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default RegistrationComponent;
