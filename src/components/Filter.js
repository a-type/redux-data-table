import React from 'react';

export default class Filter extends React.Component {
  static propTypes = {
    filterText: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  render() {
    return <input onChange={this.props.onChange} value={this.props.filterText} type="text" />;
  }
}