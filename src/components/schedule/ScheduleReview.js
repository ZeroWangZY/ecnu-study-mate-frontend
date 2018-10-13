import React, {Component} from 'react';
import {connect} from 'react-redux'
import AddScheduleReview from './AddScheduleReview';
import ScheduleReviewItem from './ScheduleReviewItem';

class ScheduleReview extends Component {

  state = {};

  render() {
    return (
      <div>
        <AddScheduleReview/> 
        {this.props.reviewList.map((review) => <ScheduleReviewItem key={review.reviewID} review={review}/>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({reviewList: state.schedule.reviewList})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleReview);
