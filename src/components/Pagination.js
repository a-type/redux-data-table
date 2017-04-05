import React from 'react';

export default class Pagination extends React.Component {
  static propTypes = {
    currentPage: React.PropTypes.number.isRequired,
    goToPage: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { jumpPage: 0 };
  }

  componentWillReceiveProps(props) {
    this.setState({ jumpPage: props.currentPage });
  }

  first = () => {
    const { goToPage } = this.props;
    goToPage(0);
  };

  back = () => {
    const { currentPage, goToPage } = this.props;
    goToPage(currentPage - 1);
  };

  last = () => {
    const { goToPage } = this.props;
    goToPage(-1);
  };

  forward = () => {
    const { currentPage, goToPage } = this.props;
    goToPage(currentPage + 1);
  };

  jump = () => {
    const { jumpPage } = this.state;
    this.props.goToPage(jumpPage);
  };

  onJumpChanged = (event) => {
    this.setState({ jumpPage: parseInt(event.target.value) });
  }

  render() {
    const { currentPage } = this.props;

    return (
      <div>
        <button onClick={this.first}>&lt;&lt;</button>
        <button onClick={this.back}>&lt;</button>
        <input size="3" type="number" value={this.state.jumpPage} onChange={this.onJumpChanged} />
        <button onClick={this.jump}>go</button>
        <button onClick={this.forward}>&gt;</button>
        <button onClick={this.last}>&gt;&gt;</button>
      </div>
    );
  }
}