import React from 'react';
import {
  List, Button, Image, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CartComponent = ({
  title, id, picture, removeFromCart, removeOneFromCart, items,
}) => (
  <List selection divided relaxed verticalAlign="middle">
    <List.Item>
      <List.Content floated="right">
        <span className="cart__count">
          {items.filter((o) => o.id === id).length}
        </span>
        <Button icon onClick={() => removeFromCart(id)} color="white"><Icon name="delete" /></Button>
        <Button icon onClick={() => removeOneFromCart(id)} color="white"><Icon name="minus" /></Button>
      </List.Content>
      <Image avatar src={picture} />
      <List.Content>{title}</List.Content>
    </List.Item>
  </List>
);

CartComponent.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  removeOneFromCart: PropTypes.func.isRequired,
  items: PropTypes.shape.isRequired,
};

export default CartComponent;
