import React from 'react';
import PropTypes from 'prop-types';

export default class SortArrow extends React.Component {
  static propTypes = {
    order: PropTypes.number,
  };

  static defaultProps = {
    order: 0,
  };

  render() {
    switch (this.props.order) {
      case -1:
        return <span>-</span>;
      case 1:
        return <span>+</span>;
      default:
        return null;
    }
  }
}