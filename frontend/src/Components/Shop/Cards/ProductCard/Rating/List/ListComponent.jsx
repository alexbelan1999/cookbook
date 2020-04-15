import React from 'react';
import PropTypes from 'prop-types';

const ListComponent = ({
  getStars, users, markItem,
}) => (
  <tr>
    <td>
      {users[users.findIndex((user) => user.id === markItem.id)].login}
    </td>
    <td>
      {getStars(markItem.value)}
    </td>
  </tr>
);

ListComponent.propTypes = {
  getStars: PropTypes.func.isRequired,
  markItem: PropTypes.shape.isRequired,
  users: PropTypes.shape.isRequired,
};

export default ListComponent;
