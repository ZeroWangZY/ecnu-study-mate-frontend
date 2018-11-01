import React from 'react'
import withStyles from '@material-ui/core/es/styles/withStyles'
import Paper from '@material-ui/core/Paper/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography/Typography'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/zh-cn'
import PropTypes from 'prop-types'
/**
 * @author Yiyang Xu
 */
const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
class PlanDetail extends React.Component {
  static propTypes = {
    plans: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        title: PropTypes.string,
        timeRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        isImportant: PropTypes.bool,
        id: PropTypes.string
      })
    ),
    timePlan: PropTypes.shape({
      relaxTime: PropTypes.arrayOf(PropTypes.number),
      sleepTime: PropTypes.arrayOf(PropTypes.number),
      studyTime: PropTypes.arrayOf(PropTypes.number),
      sportTime: PropTypes.arrayOf(PropTypes.number)
    })
  }

  render() {
    return (
      <div>
        {this.renderTable()}
        {this.renderGraph()}
      </div>
    )
  }

  renderTable = () => {
    let { classes, timePlan } = this.props
    let id = 0
    function createData(name, nums) {
      id += 1
      return { id, name, nums }
    }

    const rows = [
      createData('学习时间', timePlan.studyTime),
      createData('睡眠时间', timePlan.sleepTime),
      createData('自我调整时间', timePlan.relaxTime),
      createData('运动时间', timePlan.sportTime)
    ]
    return (
      <div style={{ marginBottom: 24 }}>
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

  renderGraph = () => {
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    const { classes, plans } = this.props
    let formats = {
      timeGutterFormat: 'a HH:mm'
    }
    let events = plans.map(item => ({ title: item.content, start: item.timeRange[0], end: item.timeRange[1] }))
    return (
      <div>
        <Typography variant="h5" color="primary">
          本周图表
        </Typography>
        <Paper className={classes.root}>
          <BigCalendar
            formats={formats}
            localizer={localizer}
            events={events}
            defaultView={'week'}
            toolbar={false}
            step={50}
          />
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
