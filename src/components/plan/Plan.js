import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import WeekList from './WeekList'
import PlanDetail from './PlanDetail'
import PlanList from './PlanList'
import Grid from '@material-ui/core/Grid'
import { createPlans } from '../../util/mock/plan'

/**
 * @author Yiyang Xu
 */

class Plan extends React.Component {
  state = {
    plans: createPlans(5),
    curWeek: 0
  }

  onAddPlan = plan => {
    this.setState(({ plans }) => {
      plans.find(i => i.week === this.state.curWeek).items.push(plan)
    })
  }

  setWeek = curWeek => () => {
    this.setState({ curWeek })
  }

  render() {
    const { classes } = this.props
    const { plans, curWeek } = this.state
    let weeks = plans.map(i => i.week)
    let planThisWeek = plans.find(i => i.week === curWeek)
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item lg={3} md={3} xs={12} style={{ maxWidth: 400 }}>
            <WeekList weeks={weeks} setWeek={this.setWeek} selectedWeek={curWeek} />
            <PlanList plans={planThisWeek.items} onAddPlan={this.onAddPlan} />
          </Grid>
          <Grid item lg={9} md={9} xs={12}>
            <PlanDetail timePlan={planThisWeek.timePlan} plans={planThisWeek.items} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    margin: 24
  }
})

export default withStyles(styles)(Plan)
