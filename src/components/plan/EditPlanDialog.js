import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import moment from 'moment'
import 'moment/locale/zh-cn'

export class EditPlanDialog extends React.Component {
  setCurPlan = plan => {
    this.setState({
      ...plan,
      startTime: plan.timeRange[0],
      endTime: plan.timeRange[1],
      isEdit: true
    })
  }

  resetPlan = () => {
    this.setState({
      title: '',
      content: '',
      isEdit: false,
      startTime: new Date(),
      endTime: new Date()
    })
  }

  state = {
    title: '',
    content: '',
    startTime: new Date(),
    endTime: new Date(),
    isEdit: false
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = () => {
    let { title, content, startTime, endTime } = this.state
    let timeRange = [startTime, endTime]
    if (endTime >= startTime) this.props.onClose({ title, content, timeRange }, this.state.isEdit)
  }
  handleClose = () => {
    this.props.onClose(null)
    this.resetPlan()
  }

  handleSetTime = field => date => {
    this.setState({
      [field]: date
    })
  }
  render() {
    const { open } = this.props
    const { startTime, endTime } = this.state
    const datePickerProps = {
      okLabel: '确认',
      cancelLabel: '取消',
      margin: 'dense',
      format: 'M月D日 HH:mm'
    }
    return (
      <Dialog onClose={this.handleClose} open={open}>
        <DialogTitle>添加你的计划</DialogTitle>
        <DialogContent>
          <DialogContentText>请按照你的实际情况，对本周的学习进行计划</DialogContentText>
          <TextField
            defaultValue={this.state.title}
            autoFocus
            label="标题"
            id="title"
            type="text"
            margin="dense"
            fullWidth
            onChange={this.handleChange('title')}
          />
          <TextField
            defaultValue={this.state.content}
            margin="dense"
            variant="outlined"
            id="content"
            label="内容"
            multiline
            rows="2"
            type="text"
            fullWidth
            onChange={this.handleChange('content')}
          />
          <MuiPickersUtilsProvider utils={MomentUtils} locale={'zh-cn'} moment={moment}>
            <DateTimePicker
              {...datePickerProps}
              label={'开始时间'}
              value={startTime}
              onChange={this.handleSetTime('startTime')}
            />
            <DateTimePicker
              {...datePickerProps}
              style={{ marginLeft: 16 }}
              minDate={startTime}
              label={'结束时间'}
              value={endTime}
              onChange={this.handleSetTime('endTime')}
            />
          </MuiPickersUtilsProvider>
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

export class DeletePlanDialog extends React.Component {
  render() {
    const { open, onClose } = this.props
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id="alert-dialog-title">{'确定删除这个计划吗？'}</DialogTitle>
        <DialogContent>
          <DialogContentText>这个操作不能撤销</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)} color="primary">
            取消
          </Button>
          <Button onClick={() => onClose(true)} color="secondary" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
