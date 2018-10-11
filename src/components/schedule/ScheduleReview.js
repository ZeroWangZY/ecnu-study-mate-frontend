import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddScheduleReview from './AddScheduleReview';
import ScheduleReviewItem from './ScheduleReviewItem';

class ScheduleReview extends Component {

  state = {};

  render() {
    return (
      <div>
        评论
        <AddScheduleReview/> 
        {this.props.reviewList.map((review, index) => <ScheduleReviewItem key={index} review={review}/>)}
      </div>
    )
  }
}
const mapStateToProps = state => ({reviewList: state.schedule.reviewList})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleReview);
