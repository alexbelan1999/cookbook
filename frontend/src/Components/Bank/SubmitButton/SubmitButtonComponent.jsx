import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, Header, Icon,
} from 'semantic-ui-react';

class SubmitButtonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  handleAddUser() {
    const {
      login, password, name, surname, email, role, id, removeRequest, changeUser,
    } = this.props;
    const user = {
      id,
      'first name': name,
      'last name': surname,
      'e-mail': email,
      'remove request': removeRequest,
      login,
      password,
      role,
    };
    changeUser(id, user);
    this.setState({ modalOpen: true });
  }

  render() {
    const { modalOpen } = this.state;
    return (
      <div className="d-flex justify-content-center userPage__button">
        <Modal
          className="userPage__modal"
          trigger={(
            <Button
              type="submit"
              onClick={this.handleAddUser}
              color="black"
            >
              confirm
            </Button>
          )}
          open={modalOpen}
          onClose={this.handleClose}
          size="small"
        >
          <Header icon="browser" content="info" />
          <Modal.Content>
            <h3>Data was succesfully saved</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.handleClose}>
              <Icon name="checkmark" />
              ok
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

SubmitButtonComponent.propTypes = {
  id: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  removeRequest: PropTypes.string.isRequired,
  changeUser: PropTypes.func.isRequired,
};

export default SubmitButtonComponent;
