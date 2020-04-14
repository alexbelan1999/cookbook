import React from 'react';
import { Container } from 'semantic-ui-react';
import Filter from './Filter/FilterContainer';
import Menu from '../Menu/MenuContainer';
import Cards from './Cards/CardsContainer';
import Footer from '../Footer/FooterComponent';

const ShopComponent = () => (
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
    <Cards />
    <Footer />
  </div>
);

export default ShopComponent;
