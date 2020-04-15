import React from 'react';
import { Input, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FilterComponent = ({
  searchQuery, setSearchQuery, setCurrentPage,
}) => (
  <Menu secondary>
    <Menu.Item position="right">
      <Input
        value={searchQuery}
        onChange={(e) => { setCurrentPage(1); setSearchQuery(e.target.value); }}
        placeholder="Поиск пользователей..."
        icon="search"
      />
    </Menu.Item>
  </Menu>
);

FilterComponent.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default FilterComponent;
