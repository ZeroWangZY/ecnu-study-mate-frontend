import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/zh-cn'
import PropTypes from 'prop-types'
import { planType, timePlanType } from './propTypes'

/**
 * @author Yiyang Xu
 */
const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

class PlanDetail extends React.Component {
  state = {
    isEditingTable: false
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
        <div className={classes.titleContainer}>
          <Typography variant="h5" color="primary">
            计划详情
          </Typography>
          <IconButton aria-label="Delete" className={classes.button}>
            {this.state.isEditingTable ? (
              <SaveIcon onClick={this.toggleEditTable(true)} />
            ) : (
              <EditIcon onClick={this.toggleEditTable(false)} />
            )}
          </IconButton>
        </div>
        <Paper className={classes.root}>
          {this.state.isEditingTable ? (
            <EditPlanTable
              classes={classes}
              rows={rows}
              ref={e => {
                this.editTable = e
              }}
            />
          ) : (
            showPlanTable({ classes, rows })
          )}
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

  toggleEditTable = edit => () => {
    this.setState({ isEditingTable: !edit })
    if (edit) {
      this.props.uploadTimePlan(this.props.timePlan.id, this.editTable.state.rows.map(i => i.nums.join(',')))
    }
  }
}

const showPlanTable = props => {
  let { classes, rows } = props
  return (
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
  )
}

class EditPlanTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: props.rows.map(i => ({ ...i, nums: [...i.nums] }))
    }
  }

  onChangeTimePlanCell = (typeIndex, dayIndex) => evt => {
    let value = evt.target.value
    this.setState(({ rows }) =>
      rows.map((row, rowIndex) => {
        if (rowIndex === typeIndex) {
          let newNums = row.nums
          newNums[dayIndex] = value
          return { ...row, nums: newNums }
        }
        return row
      })
    )
  }

  render() {
    const { classes } = this.props
    const { rows } = this.state
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>时间类别</TableCell>
            {weekdays.map(w => (
              <TableCell key={w}>{w}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, typeIndex) => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {weekdays.map((w, index) => (
                  <TableCell key={index.toString()} numeric>
                    <input
                      value={row.nums[index]}
                      type={'number'}
                      min="0"
                      max="24"
                      onChange={this.onChangeTimePlanCell(typeIndex, index)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
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
    minWidth: 880
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

PlanDetail.propTypes = {
  plans: PropTypes.arrayOf(planType),
  timePlan: timePlanType,
  uploadTimePlan: PropTypes.func
}
export default withStyles(styles)(PlanDetail)
