import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import WeekList from './WeekList'
import PlanDetail from './PlanDetail'
import PlanList from './PlanList'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { addPlan, deletePlan, refreshPlan, updatePlan, updateTimePlan } from '../../redux/actions/plan'
import PropTypes from 'prop-types'
import { planType, timePlanType } from './propTypes'

/**
 * @author Yiyang Xu
 */

class Plan extends React.Component {
  state = {
    curWeekIndex: 0
  }

  setWeek = curWeekIndex => () => {
    this.setState({ curWeekIndex })
  }

  handleAddPlan = (title, content, timeRange, isImportant) => {
    this.props.addPlan(title, content, timeRange, isImportant, this.props.weeks[this.state.curWeekIndex].week)
  }
  handleUpdatePlan = (id, title, content, timeRange, isImportant) => {
    this.props.updatePlan(id, title, content, timeRange, isImportant, this.props.weeks[this.state.curWeekIndex].week)
  }

  handleUpdateTimePlan = (id, timePlanList) => {
    this.props.updateTimePlan(
      id,
      this.state.curWeekIndex,
      timePlanList[0],
      timePlanList[1],
      timePlanList[2],
      timePlanList[3]
    )
  }

  render() {
    const { classes, weeks, deletePlan } = this.props
    const { curWeekIndex } = this.state
    let weekIndexList = weeks.map(i => i.week)
    let planThisWeek = weeks[curWeekIndex]
    if (weeks.length === 0) return <div />
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item lg={3} md={3} xs={12} style={{ maxWidth: 400 }}>
            <WeekList weeks={weekIndexList} setWeek={this.setWeek} selectedWeek={curWeekIndex} />
            <PlanList
              plans={planThisWeek.items}
              onAddPlan={this.handleAddPlan}
              onDeletePlan={deletePlan}
              onUpdatePlan={this.handleUpdatePlan}
            />
          </Grid>
          <Grid item lg={9} md={9} xs={12}>
            <PlanDetail
              timePlan={planThisWeek.timePlan}
              plans={planThisWeek.items}
              uploadTimePlan={this.handleUpdateTimePlan}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

Plan.propTypes = {
  weeks: PropTypes.arrayOf(
    PropTypes.shape({
      week: PropTypes.number,
      timePlan: timePlanType,
      items: PropTypes.arrayOf(planType)
    })
  )
}

const styles = theme => ({
  root: {
    margin: 24
  }
})

const mapStateToProps = state => ({
  weeks: state.plan.weeks
})

const mapDispatchToProps = dispatch => ({
  refreshPlan: () => dispatch(refreshPlan),
  addPlan: (title, content, timeRange, isImportant, week) =>
    dispatch(addPlan(title, content, timeRange, isImportant, week)),
  deletePlan: id => dispatch(deletePlan(id)),
  updatePlan: (id, title, content, timeRange, isImportant, week) =>
    dispatch(updatePlan(id, title, content, timeRange, isImportant, week)),
  updateTimePlan: (id, week, studyTime, sleepTime, relaxTime, sportTime) =>
    dispatch(updateTimePlan(id, week, studyTime, sleepTime, relaxTime, sportTime))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Plan))
