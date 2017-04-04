import React from 'react';
import { connect } from 'react-redux';
import data from './data';
import ExampleTable from './ExampleTable';

class View extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    data: React.PropTypes.array,

    loadData: React.PropTypes.func,
  };

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <ExampleTable
        data={this.props.data}
        loading={this.props.loading}
        />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.app.loading,
  data: state.app.data,
});

const mapDispatchToProps = (dispatch) => ({
  loadData: () => {
    dispatch({ type: 'GOT_DATA', payload: data });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);