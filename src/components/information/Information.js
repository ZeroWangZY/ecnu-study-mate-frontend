import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from '@material-ui/core/styles'
import InformationTable from './InformationTable'
import CourseTable from './CourseTable'
import Review from './Review'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ReviewEditingWindow from './ReviewEditingWindow'
import StudentAddingWindow from './StudentAddingWindow'
import { addStudent, addReview, changeCurrentStudentId } from '../../redux/actions/information'
import IdSelector from './IdSelector'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

class Information extends Component {
  state = {
    value: 0,
    review_win_open: false,
    stu_win_open: false
  }

  handleClickOpenReview = () => {
    this.setState({ review_win_open: true })
  }

  handleCloseReview = () => {
    this.setState({ review_win_open: false })
  }
  handleClickOpenStu = () => {
    this.setState({ stu_win_open: true })
  }

  handleCloseStu = () => {
    this.setState({ stu_win_open: false })
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  handleAddReview = (overview, reason) => {
    this.props.addReview(this.props.data.studentInfo.studentID, overview, reason)
  }
  handleAddStu = (student_id) =>{
      this.props.addStudent(student_id)
  }

  render() {
    const { classes, theme, data, role } = this.props
    const isAdminOrTeacher = role === 'ROLE_ADMIN' || role === 'ROLE_PSYCHOLOGY'
    const ReviewAddingButton = (
      <Button
        variant="extendedFab"
        aria-label="addReview"
        className={classes.button}
        color="primary"
        onClick={this.handleClickOpenReview}
      >
        <AddIcon className={classes.extendedIcon} />
        新增评价
      </Button>
    )
    const StudentAddingButton = (
        <Button
            variant="extendedFab"
            aria-label="addStudent"
            className={classes.button}
            color="primary"
            onClick={this.handleClickOpenStu}
        >
        <AddIcon className={classes.extendedIcon} />
            新增学生
        </Button>
    )
    return (
      <div className="information-container">
        {isAdminOrTeacher ? (
          <IdSelector
            currentId={data.currentStudentId}
            studentIdList={data.studentIdList}
            onCurrentIdChange={this.props.changeStudentCurrentId}
          />
        ) : null}
        <Paper square>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            centered
          >
            <Tab label="学生档案" />
            {/* <Tab label="学习伙伴档案" disabled={role === 'ROLE_USER'} /> */}
          </Tabs>
        </Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>基本信息</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <InformationTable data={data.studentInfo} studentID={data.currentStudentId}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>不及格的课程</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CourseTable data={data.failedCourses} studentID={data.currentStudentId}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {role !== 'ROLE_USER' && (
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>学生评价</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Review data={data.reviews} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <InformationTable data={data.partnerInfo} />
          </TabContainer>
        </SwipeableViews>
        <div style={{position :'fixed', right: 6, bottom: 6}}>
        {role === 'ROLE_USER' ? null : ReviewAddingButton}
        {role === 'ROLE_USER' ? null : StudentAddingButton}
        </div>
        <ReviewEditingWindow open={this.state.review_win_open} handleClose={this.handleCloseReview} addReview={this.handleAddReview} />
        <StudentAddingWindow open={this.state.stu_win_open} handleClose={this.handleCloseStu} addStudent={this.handleAddStu} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.information,
  role: state.app.role
})
const mapDispatchToProps = dispatch => ({
  addReview: (id, overview, reason) => dispatch(addReview(id, overview, reason)),
  addStudent: (student_id) => dispatch(addStudent(student_id)),
  changeStudentCurrentId: id => dispatch(changeCurrentStudentId(id))
})

const InformationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Information)
export default withStyles(styles, { withTheme: true })(InformationPage)
