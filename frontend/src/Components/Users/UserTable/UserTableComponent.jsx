import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
} from 'semantic-ui-react';

class UserTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersPerPage: 15,
    };
  }

  componentDidMount() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      const { loadData } = this.props;
      loadData();
    }
  }

  handleClick = (event) => {
    this.updatePageCount(event.target.id);
    document.documentElement.scrollTop = 0;
  };

  updatePageCount = (page) => {
    const { usersPerPage } = this.state;
    const {
      users, setPageCountUsers, setCurrentPageUsers,
    } = this.props;
    const indexOfLastProduct = page * usersPerPage;
    const indexOfFirstProduct = indexOfLastProduct - usersPerPage;
    setPageCountUsers(users.slice(indexOfFirstProduct, indexOfLastProduct).length);
    setCurrentPageUsers(Number(page));
  }

  handleClickPrev = () => {
    let { currentPage } = this.props;
    if (currentPage - 1 > 0) {
      currentPage -= 1;
    }
    this.updatePageCount(currentPage);
    document.documentElement.scrollTop = 0;
  };

  handleClickNext = () => {
    const { users } = this.props;
    const { usersPerPage } = this.state;
    let { currentPage } = this.props;
    if (currentPage + 1 <= Math.ceil(users.length / usersPerPage)) {
      currentPage += 1;
    }
    this.updatePageCount(currentPage);
    document.documentElement.scrollTop = 0;
  };

  handleChange = (e, user) => {
    const { changeUser } = this.props;
    const newUser = { ...user };
    newUser.role = e.target.value;
    changeUser(user.id, newUser);
  };

  render() {
    const {
      users, isReady, removeUser, currentPage,
    } = this.props;
    const { usersPerPage } = this.state;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const pageNumbers = [];
    if (isReady) {
      for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i += 1) {
        pageNumbers.push(i);
      }
    }
    /* eslint-disable */
    const renderPageNumbers = pageNumbers.map((number) => (
      currentPage !== number
      ? <div className="page-number" key={number} id={number} onClick={this.handleClick}>
        {number}
      </div>
      : <div className="page-number number-selected" key={number} id={number} onClick={this.handleClick}>
        {number}
      </div>
    ));
    /* eslint-enable */
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="main-content__table clearfix">
              <table>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Remove request</th>
                </tr>
                {!isReady
                  ? 'загрузка'
                  : users.slice(indexOfFirstUser, indexOfLastUser).map((user) => (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user['first name']}</td>
                      <td>{user['last name']}</td>
                      <td>{user['e-mail']}</td>
                      <td>
                        <select className="select" onChange={(e) => this.handleChange(e, user)}>
                          <option value="" selected disabled hidden>{user.role}</option>
                          <option>admin</option>
                          <option>user</option>
                        </select>
                      </td>
                      {user['remove request'] === true
                        ? (
                          <td className="table__button">
                            {/* eslint-disable */}
                            <Icon className="table__icon" name="delete" color="black" onClick={removeUser.bind(this,user['id'])} />
                            {/* eslint-enable */}
                          </td>
                        )
                        : <td />}
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </div>
        {!isReady
          ? ''
          : (
            <div className="pages">
              <div className="pages__center-block clearfix">
                <div className="row">
                  <div className="col-md-1">
                    {/* eslint-disable */}
                    <div className="prev-icon" onClick={this.handleClickPrev} />
                    {/* eslint-enable */}
                  </div>
                  <div className="col-md-10">
                    <div className="page-numbers d-flex justify-content-center">
                      {renderPageNumbers}
                    </div>
                  </div>
                  <div className="col-md-1">
                    {/* eslint-disable */}
                    <div className="next-icon" onClick={this.handleClickNext} />
                    {/* eslint-enable */}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

UserTableComponent.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      'first name': PropTypes.string.isRequired,
      'last name': PropTypes.string.isRequired,
      'e-mail': PropTypes.string.isRequired,
      'remove request': PropTypes.string.isRequired,
    }),
  ).isRequired,
  isReady: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setPageCountUsers: PropTypes.func.isRequired,
  setCurrentPageUsers: PropTypes.func.isRequired,
  changeUser: PropTypes.func.isRequired,
};

export default UserTableComponent;
