import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import PlanListItem from './PlanListItem'

class Plan extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>计划表</h1>
        <List dense={false}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <PlanListItem content={'hahahahha'} time={123123123} />
          ))}
        </List>
      </div>
    )
  }
}

const styles = {}

export default withStyles(styles)(Plan)
