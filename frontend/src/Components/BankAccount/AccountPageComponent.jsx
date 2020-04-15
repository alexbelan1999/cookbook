import React, { Component } from 'react';
import {
  Container, Input, Form, Checkbox,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Menu from '../Menu/MenuContainer';
import Footer from '../Footer/FooterComponent';
import SubmitButton from './SubmitButton/SubmitButtonContainer';

class AccountPageComponent extends Component {
  constructor(props) {
    super(props);
    const { user, userSwitch } = this.props;
    this.state = {
      id: user.id,
      userRole: userSwitch,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
  }

  componentDidMount() {
    const { isLoaded } = this.props;
    if (!isLoaded) {
      const { loadData } = this.props;
      loadData();
    }
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleToggleChange() {
    const { removeRequest } = this.state;
    this.setState({
      removeRequest: !removeRequest,
    });
  }

  handleChangeRole() {
    const { userRole } = this.state;
    const { changeRole } = this.props;
    changeRole(!userRole);
    this.setState({
      userRole: !userRole,
    });
  }

  render() {
    const {
      isReady,
    } = this.props;
    const {
      id, userRole,
    } = this.state;
    return (
      <div>
        <div className="header__content">
          <Menu />
        </div>
        <Container>
          <div className="main-content">
            <div className="main-content__title">
              USER INFO
            </div>
            <div className="main-content__userData">
              {!isReady
                ? ('загрузка')
                : (
                  <Form>
                    <Input
                      action={{
                        color: 'black',
                        labelPosition: 'left',
                        icon: 'circle outline',
                        content: 'first name',
                      }}
                      name="name"
                      actionPosition="left"
                      placeholder="first name"
                      defaultValue={id}
                      onChange={this.handleChange}
                    />
                    <Input
                      action={{
                        color: 'black',
                        labelPosition: 'left',
                        icon: 'circle outline',
                        content: 'last name',
                      }}
                      name="surname"
                      actionPosition="left"
                      placeholder="last name"
                      defaultValue={id}
                      onChange={this.handleChange}
                    />
                    <Input
                      action={{
                        color: 'black',
                        labelPosition: 'left',
                        icon: 'circle outline',
                        content: 'e-mail',
                      }}
                      name="email"
                      actionPosition="left"
                      placeholder="e-mail"
                      defaultValue={id}
                      onChange={this.handleChange}
                    />
                    <Input
                      action={{
                        color: 'black',
                        labelPosition: 'left',
                        icon: 'circle outline',
                        content: 'login',
                      }}
                      name="login"
                      actionPosition="left"
                      placeholder="login"
                      defaultValue={id}
                      onChange={this.handleChange}
                    />
                    <Input
                      action={{
                        color: 'black',
                        labelPosition: 'left',
                        icon: 'circle outline',
                        content: 'password',
                      }}
                      name="password"
                      actionPosition="left"
                      placeholder="password"
                      type="password"
                      defaultValue={id}
                      onChange={this.handleChange}
                    />
                    <Input
                      action={{
                        color: 'black',
                        labelPosition: 'left',
                        icon: 'circle outline',
                        content: 'role',
                      }}
                      name="role"
                      actionPosition="left"
                      placeholder="role"
                      value={id}
                    />
                    { id !== 'admin'
                      ? (
                        <div className="d-flex justify-content-center userPage__button">
                          <Checkbox
                            label="remove request"
                            toggle
                            name="removeRequest"
                            actionPosition="left"
                            placeholder="remove request"
                            onClick={this.handleToggleChange}
                            checked={id}
                          />
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center userPage__button">
                          <Checkbox
                            label="simple user mode"
                            toggle
                            name="removeRequest"
                            actionPosition="left"
                            onClick={this.handleChangeRole}
                            checked={userRole}
                          />
                        </div>
                      )}
                    <SubmitButton
                      id={id}
                    />
                  </Form>
                )}
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}

AccountPageComponent.propTypes = {
  user: PropTypes.shape.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
  userSwitch: PropTypes.bool.isRequired,
  changeRole: PropTypes.func.isRequired,
};

export default AccountPageComponent;
