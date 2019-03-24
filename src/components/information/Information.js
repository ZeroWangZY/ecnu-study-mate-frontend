import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import InformationTable from './InformationTable';
import CourseTable from './CourseTable';
import Review from './Review';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ReviewEditingWindow from './ReviewEditingWindow';
import { getRole } from '../../redux/store/index';
import { addReview } from '../../redux/actions/information';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    right: 6,
    bottom: 6
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

class Information extends Component {
  state = {
    value: 0,
    open: false,

  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  
  handleAddReview = (overview, reason) => {
    this.props.addReview(this.props.data.studentInfo.studentID, overview, reason)
  }

  render () {
    const { classes, theme, data } = this.props;
    const role = getRole();
    const ReviewAddingButton = <Button
                                variant="extendedFab"
                                aria-label="add"
                                className={classes.button}
                                color="primary"
                                onClick={this.handleClickOpen}>
                                <AddIcon className={classes.extendedIcon}/>
                                新增评价
                              </Button>
    return (
      <div className="information-container">
          <Paper square>
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
              centered
            >
              <Tab label="学生档案" />
              <Tab label="学习伙伴档案" disabled={role === 'ROLE_USER'}/>
            </Tabs>
          </Paper>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
              <InformationTable data={data.studentInfo} />
              <CourseTable data={data.failedCourses} />
              { role === 'ROLE_USER' ? null : <Review data={data.reviews} /> }
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <InformationTable data={data.partnerInfo} />
            </TabContainer>
          </SwipeableViews>

          { role === 'ROLE_USER' ? null : ReviewAddingButton }
          

          <ReviewEditingWindow open={this.state.open} handleClose={this.handleClose} addReview={this.handleAddReview}/>
      </div>
    );

  }
}

const mapStateToProps = state => ({
  data: state.information,
  role: state.app.role
})
const mapDispatchToProps = dispatch => ({
  addReview: (id, overview, reason) => dispatch(addReview(id, overview, reason))
})

const InformationPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Information);
export default withStyles(styles, { withTheme: true })(InformationPage)
