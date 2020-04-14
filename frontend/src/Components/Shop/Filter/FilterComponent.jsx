import React from 'react';
import { Input, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FilterComponent = ({
  setFilter, filterBy, searchQuery, setSearchQuery, setCurrentPage,
}) => (
  <Menu secondary>
    <Menu.Item
      active={filterBy === 'all'}
      onClick={() => { setCurrentPage(1); setFilter('all'); }}
      class="filter__item"
    >
      Все
    </Menu.Item>
    <Menu.Item
      active={filterBy === 'popular'}
      onClick={() => { setCurrentPage(1); setFilter('popular'); }}
    >
      Популярные
    </Menu.Item>
    <Menu.Item
      active={filterBy === 'price_high'}
      onClick={() => { setCurrentPage(1); setFilter('price_high'); }}
    >
      Дорогие
    </Menu.Item>
    <Menu.Item
      active={filterBy === 'price_low'}
      onClick={() => { setCurrentPage(1); setFilter('price_low'); }}
    >
      Дешёвые
    </Menu.Item>
    <Menu.Item
      active={filterBy === 'marked'}
      onClick={() => { setCurrentPage(1); setFilter('marked'); }}
    >
      Оценены
    </Menu.Item>
    <Menu.Item position="right">
      <Input
        value={searchQuery}
        onChange={(e) => { setCurrentPage(1); setSearchQuery(e.target.value); }}
        placeholder="Поиск по тегам..."
        icon="search"
      />
    </Menu.Item>
  </Menu>
);

FilterComponent.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filterBy: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default FilterComponent;
