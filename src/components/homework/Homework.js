import React, {Component} from 'react';
import HomeworkItem from './HomeworkItem';
import { withStyles } from '@material-ui/core/styles';

import {connect} from "react-redux";
import {refreshHomework} from "../../redux/actions/homework";
import {refreshSchedule} from "../../redux/actions/schedule";
import {getStudentId} from "../../redux/store";

class Homework extends React.Component {
    constructor(props){
        super(props);
    }
// TODO: move refresh2() to componentDidMiunt
  render () {
      this.props.refresh2();
   //     const {homeList}=this.state;
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
//export default Homework;
