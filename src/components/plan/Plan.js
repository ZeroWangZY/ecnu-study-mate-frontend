import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import WeekList from './WeekList'
import PlanDetail from './PlanDetail'
import PlanList from './PlanList'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { addPlan, refreshPlan } from '../../redux/actions/plan'
import PropTypes from 'prop-types'

/**
 * @author Yiyang Xu
 */

class Plan extends React.Component {
  state = {
    curWeek: 1
  }

  componentDidMount() {
    this.props.refreshPlan()
  }

  setWeek = curWeek => () => {
    this.setState({ curWeek })
  }

  handleAddPlan = (title, content, timeRange, isImportant) => {
    this.props.addPlan(title, content, timeRange, isImportant, this.state.curWeek)
  }

  render() {
    const { classes, weeks } = this.props
    if (weeks.length === 0) return <div />
    const { curWeek } = this.state
    let weekIndexList = weeks.map(i => i.week)
    let planThisWeek = weeks.find(i => i.week === curWeek)
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item lg={3} md={3} xs={12} style={{ maxWidth: 400 }}>
            <WeekList weeks={weekIndexList} setWeek={this.setWeek} selectedWeek={curWeek} />
            <PlanList plans={planThisWeek.items} onAddPlan={this.handleAddPlan} />
          </Grid>
          <Grid item lg={9} md={9} xs={12}>
            <PlanDetail timePlan={planThisWeek.timePlan} plans={planThisWeek.items} />
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
      timePlan: PropTypes.shape({
        relaxTime: PropTypes.arrayOf(PropTypes.number),
        sleepTime: PropTypes.arrayOf(PropTypes.number),
        studyTime: PropTypes.arrayOf(PropTypes.number),
        sportTime: PropTypes.arrayOf(PropTypes.number)
      }),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.string,
          title: PropTypes.string,
          timeRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
          isImportant: PropTypes.bool
        })
      )
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
    dispatch(addPlan(title, content, timeRange, isImportant, week))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Plan))
