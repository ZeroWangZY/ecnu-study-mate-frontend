import React, {Component} from 'react';

import {connect} from "react-redux";

class Information extends Component {
  render () {
    return (
      <div className="information-container">
          information
      </div>
    );

  }
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
})

const InformationPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Information);
export default InformationPage
