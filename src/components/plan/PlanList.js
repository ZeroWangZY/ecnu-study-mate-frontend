import React from 'react'
import { withStyles } from '@material-ui/core/styles'
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
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

/**
 * @author Yiyang Xu
 */
class PlanList extends React.Component {
  static propTypes = {
    plans: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        timeRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
        title: PropTypes.string.isRequired,
        isImportant: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired
      })
    ),
    onAddPlan: PropTypes.func.isRequired,
    onDeletePlan: PropTypes.func.isRequired,
    onUpdatePlan: PropTypes.func.isRequired
  }
  state = {
    dialogOpen: false,
    anchorMenuEl: null,
    alertDialogOpen: false,
    currentItem: null
  }
  handleClose = (form, isUpdate) => {
    this.setState({ dialogOpen: false })
    if (form) {
      if (!isUpdate) this.props.onAddPlan(form.title, form.content, form.timeRange, false)
      else this.props.onUpdatePlan(this.state.currentItem.id, form.title, form.content, form.timeRange, false)
    }
  }
  handleOpen = dialogName => () => {
    this.setState({ [dialogName]: true })
  }

  handleMenuClose = () => {
    this.setState({ anchorMenuEl: null })
  }

  handleMenuOpen = plan => event => {
    this.setState({ anchorMenuEl: event.currentTarget, currentItem: plan })
    this.editDialog.setCurPlan(plan)
  }

  render() {
    let { plans, classes, onDeletePlan } = this.props
    let { anchorMenuEl } = this.state
    return (
      <div>
        <div className={classes.titleContainer}>
          <Typography variant="h5" color="primary">
            计划列表
          </Typography>
          <Button variant="fab" color="primary" mini onClick={this.handleOpen('dialogOpen')}>
            <AddIcon />
          </Button>
        </div>
        <List>
          {plans.map((item, index) => {
            let formattedTime = item.timeRange.map(item => moment(item).format('dddd HH:mm'))
            return (
              <PlanListItem
                onClick={this.handleMenuOpen(item)}
                key={item.id}
                id={item.id}
                content={item.content}
                time={formattedTime.join(' ~ ')}
                title={item.title}
              />
            )
          })}
        </List>
        <EditPlanDialog open={this.state.dialogOpen} onClose={this.handleClose} ref={el => (this.editDialog = el)} />
        <DeletePlanDialog
          open={this.state.alertDialogOpen}
          onClose={needDelete => {
            this.setState({ alertDialogOpen: false })
            if (needDelete) {
              onDeletePlan(this.state.currentItem.id)
            }
          }}
        />
        <Menu
          id="edit-menu"
          anchorEl={anchorMenuEl}
          open={Boolean(anchorMenuEl)}
          onClose={() => {
            this.handleMenuClose()
            this.editDialog.resetPlan()
          }}
        >
          <MenuItem
            onClick={() => {
              this.handleMenuClose()
              this.handleOpen('dialogOpen')()
            }}
          >
            编辑
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleMenuClose()
              this.handleOpen('alertDialogOpen')()
            }}
          >
            删除
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

class EditPlanDialog extends React.Component {
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
      isEdit: false
    })
  }

  state = {
    id: '',
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

  // TODO: 日期提交有bug
  handleSubmit = () => {
    let { title, content, startTime, endTime } = this.state
    let timeRange = [startTime, endTime]
    this.props.onClose({ title, content, timeRange }, this.state.isEdit)
  }
  handleClose = () => {
    this.props.onClose(null)
    this.resetPlan()
  }

  render() {
    const { open } = this.props
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

class DeletePlanDialog extends React.Component {
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

const styles = {
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}
export default withStyles(styles)(PlanList)
