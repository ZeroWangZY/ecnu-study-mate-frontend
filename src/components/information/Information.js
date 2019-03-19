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

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

class Information extends Component {
  state = {
    value: 0,
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
              <Typography variant="h6">
                基本信息
              </Typography>
              <InformationTable data={data.studentInfo} />
              <Typography variant="h6" gutterBottom>
                不及格的课程
              </Typography>
              <CourseTable data={data.failedCourses} />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <InformationTable data={data.partnerInfo} />
            </TabContainer>
          </SwipeableViews>
      </div>
    );

  }
}

const mapStateToProps = state => ({
  data: state.information
})
const mapDispatchToProps = dispatch => ({
})

const InformationPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Information);
export default withStyles(styles, { withTheme: true })(InformationPage)
