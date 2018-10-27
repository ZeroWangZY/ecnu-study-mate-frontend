import React from 'react'
import withStyles from '@material-ui/core/es/styles/withStyles'
import Paper from '@material-ui/core/Paper/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography/Typography'
/**
 * @author Yiyang Xu
 */
const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
class PlanDetail extends React.Component {
  render() {
    let { classes, timePlan } = this.props
    let id = 0
    function createData(name, nums) {
      id += 1
      return { id, name, nums }
    }

    const rows = [
      createData('学习时间', timePlan[0]),
      createData('睡眠时间', timePlan[1]),
      createData('自我调整时间', timePlan[2]),
      createData('运动时间', timePlan[3])
    ]

    return (
      <div>
        <Typography variant="h5" color="primary">
          计划详情
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>时间类别</TableCell>
                {weekdays.map(w => (
                  <TableCell key={w.toString()} numeric>
                    {w}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {weekdays.map((w, index) => (
                      <TableCell key={index.toString()} numeric>
                        {row.nums[index]}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
})
export default withStyles(styles)(PlanDetail)
