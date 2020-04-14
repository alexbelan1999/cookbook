import React from 'react';
import PropTypes from 'prop-types';


const StarComponent = ({
  value,
  color,
  handleHover,
  handleHoverLeave,
  handleClick,
  isFilled,
}) => {
  if (!handleHover) {
    return (
      /* eslint-disable */
      <span
        className="rating__icon"
        style={{ color }}
        onMouseEnter={() => console.log('HOVERED IN')}
        onMouseLeave={() => console.log('HOVERED OUT')}
        onClick={() => alert('CLICKED A STAR!')}
      >
        {isFilled ? '★' : '☆'}
      </span>
      /* eslint-enable */
    );
  }
  return (
    /* eslint-disable */
    <span
      className="Star"
      style={{ color }}
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHoverLeave(value)}
      onClick={() => handleClick(value)}
    >
      {isFilled ? '★' : '☆'}
    </span>
    /* eslint-enable */
  );
};

StarComponent.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  handleHover: PropTypes.func.isRequired,
  handleHoverLeave: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isFilled: PropTypes.bool.isRequired,
};

export default StarComponent;
