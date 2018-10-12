import React, {Component} from 'react';
import HomeworkItem from './HomeworkItem';

import {connect} from "react-redux";
import {refreshHomework} from "../../redux/actions/homework";
import {getStudentId} from "../../redux/store";

class Homework extends React.Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {
        this.props.refresh2();
    }
// TODO: move refresh2() to componentDidMiunt
  render () {
    return (
      <div className="homework-container" style={{textAlign: 'center'}}>
          {
             this.props.homeList.map((item,i) =>{
                 return (
                     <HomeworkItem key={i} item={item}/>
                 )
             })
          }
      </div>
    );

  }
}

const mapStateToProps = state => ({
    homeList:state.homework
})
const mapDispatchToProps = dispatch => ({
    refresh2: () => dispatch(refreshHomework(getStudentId()))
})

const HomeworkPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Homework);
export default HomeworkPage
