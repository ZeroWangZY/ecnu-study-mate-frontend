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
  
  render () {
    const { classes, theme, data } = this.props;

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
              <Tab label="学习伙伴档案" />
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
              <Review data={data.reviews} />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <InformationTable data={data.partnerInfo} />
            </TabContainer>
          </SwipeableViews>

          <Button
            variant="extendedFab"
            aria-label="add"
            className={classes.button}
            color="primary"
            onClick={this.handleClickOpen}>
            <AddIcon className={classes.extendedIcon}/>
            新增评价
          </Button>

          <ReviewEditingWindow open={this.state.open} handleClose={this.handleClose}/>
      </div>
    );

  }
}

const mapStateToProps = state => ({
  data: state.information,
  role: state.app.role
})
const mapDispatchToProps = dispatch => ({
})

const InformationPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Information);
export default withStyles(styles, { withTheme: true })(InformationPage)
