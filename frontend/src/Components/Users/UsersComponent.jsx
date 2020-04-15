import React from 'react';
import { Container } from 'semantic-ui-react';
import Menu from '../Menu/MenuContainer';
import UserTable from './UserTable/UserTableContainer';
import Footer from '../Footer/FooterComponent';
import Filter from './Filter/FilterContainer';

const UsersComponent = () => (
  <div>
    <div className="header__content">
      <Menu />
    </div>
    <div className="container-fluid">
      <div className="devider" />
    </div>
    <div className="filter__content">
      <Container>
        <Filter />
      </Container>
    </div>
    <UserTable />
    <Footer />
  </div>
);

export default UsersComponent;
