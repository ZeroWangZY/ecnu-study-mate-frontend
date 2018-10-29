import React from 'react'
import withStyles from '@material-ui/core/es/styles/withStyles'
import List from '@material-ui/core/List'
import PlanListItem from './PlanListItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import moment from 'moment'
import PropTypes from 'prop-types'
/**
 * @author Yiyang Xu
 */
class PlanList extends React.Component {
  static propTypes = {
    plans: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        timeRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
        title: PropTypes.string.isRequired
      })
    ),
    onAddPlan: PropTypes.func.isRequired
  }
  state = {
    dialogOpen: false
  }
  handleClose = form => {
    this.setState({ dialogOpen: false })
    if (form) {
      this.props.onAddPlan(form)
    }
  }
  handleOpen = () => {
    this.setState({ dialogOpen: true })
  }
  render() {
    let { plans, classes } = this.props
    return (
      <div>
        <div className={classes.titleContainer}>
          <Typography variant="h5" color="primary">
            计划列表
          </Typography>
          <Button variant="fab" color="primary" mini onClick={this.handleOpen}>
            <AddIcon />
          </Button>
        </div>
        <List>
          {plans.map((item, index) => {
            let formattedTime = item.timeRange.map(item => moment(item).format('dddd H:m'))
            return (
              <PlanListItem
                key={index.toString()}
                content={item.content}
                time={formattedTime.join(' ~ ')}
                title={item.title}
              />
            )
          })}
        </List>
        <AddPlanDialog open={this.state.dialogOpen} onClose={this.handleClose} />
      </div>
    )
  }
}

class AddPlanDialog extends React.Component {
  state = {
    title: '',
    content: '',
    startTime: new Date(),
    endTime: new Date()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = () => {
    let { title, content, startTime, endTime } = this.state
    let timeRange = [startTime, endTime]
    this.props.onClose({ title, content, timeRange })
  }
  handleClose = () => {
    this.props.onClose(null)
  }
  render() {
    const { open } = this.props
    return (
      <Dialog onClose={this.handleClose} open={open}>
        <DialogTitle>添加你的计划</DialogTitle>
        <DialogContent>
          <DialogContentText>请按照你的实际情况，对本周的学习进行计划</DialogContentText>
          <TextField
            autoFocus
            label="标题"
            id="title"
            type="text"
            margin="dense"
            fullWidth
            onChange={this.handleChange('title')}
          />
          <TextField
            margin="dense"
            id="content"
            label="内容"
            type="text"
            fullWidth
            onChange={this.handleChange('content')}
          />
          <TextField
            fullWidth
            id="startTime"
            margin="dense"
            label="开始时间"
            type="datetime-local"
            defaultValue="2018-10-25T10:30"
            onChange={this.handleChange('startTime')}
          />
          <TextField
            fullWidth
            id="endTime"
            margin="dense"
            label="结束时间"
            type="datetime-local"
            defaultValue="2018-10-25T10:30"
            onChange={this.handleChange('endTime')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            取消
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            提交
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const styles = {
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}
export default withStyles(styles)(PlanList)
