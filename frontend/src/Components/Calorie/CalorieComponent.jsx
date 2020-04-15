import React from 'react';
import { Container } from 'semantic-ui-react';
import Menu from '../Menu/MenuContainer';
import CalorieTable from './CalorieTable/CalorieTableContainer';
import Footer from '../Footer/FooterComponent';
import Filter from './Filter/FilterContainer';

const CalorieComponent = () => (
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
    <CalorieTable />
    <Footer />
  </div>
);

export default CalorieComponent;
