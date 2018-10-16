import React, {Component} from 'react';
import HomeworkItem from './HomeworkItem';

import {connect} from "react-redux";
import {refreshHomework} from "../../redux/actions/homework";

class Homework extends Component {
    componentDidMount() {
        this.props.refresh2();
    }
// TODO: move refresh2() to componentDidMiunt
  render () {
    let currentTime1 = new Date().getTime();
    return (
      <div className="homework-container" style={{textAlign: 'center'}}>
          {
             this.props.homeList.map((item,i) =>{
                 return (
                     <HomeworkItem key={item.homeworkID + currentTime1} item={item}/>
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
    refresh2: () => dispatch(refreshHomework())
})

const HomeworkPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Homework);
export default HomeworkPage
