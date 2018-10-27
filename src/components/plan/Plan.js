import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import WeekList from './WeekList'
import PlanDetail from './PlanDetail'
import PlanList from './PlanList'
import Grid from '@material-ui/core/Grid'
/**
 * @author Yiyang Xu
 */
function createDemoTimePlan() {
  let result = []
  for (let i = 0; i < 4; i++) {
    let temp = []
    for (let j = 0; j < 7; j++) {
      temp.push(Math.ceil(Math.random() * 24))
    }
    result.push(temp)
  }
  return result
}
class Plan extends React.Component {
  state = {
    plans: [
      {
        week: 0,
        timePlan: createDemoTimePlan(),
        items: [
          { content: '学习 TypeScript 的基础用法', timeBlock: [0, 4] },
          { content: '整理 Tarjan 算法和 Kosaraju 算法', timeBlock: [1, 5] }
        ]
      },
      {
        week: 1,
        timePlan: createDemoTimePlan(),
        items: [{ content: '复习100个 雅思单词', timeBlock: [0, 4] }, { content: '看700集海贼王', timeBlock: [1, 5] }]
      }
    ],
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
          <Grid item lg={3} md={3} xs={12}>
            <WeekList weeks={weeks} setWeek={this.setWeek} selectedWeek={curWeek} />
            <PlanList plans={planThisWeek.items} onAddPlan={this.onAddPlan} />
          </Grid>
          <Grid item lg={9} md={9} xs={12}>
            <PlanDetail timePlan={planThisWeek.timePlan} />
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
