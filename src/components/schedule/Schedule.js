import React, {Component} from 'react';
import Calendar from './Calendar';
import {withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import {addSchedule, updateSchedule, deleteSchedule} from '../../redux/actions/schedule';
import ScheduleReview from './ScheduleReview';
import { jsDateToCalendarDate } from '../../util/date';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    right: 6,
    bottom: 6
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function Transition(props) {
  return <Slide direction="up" {...props}/>;
}

class Schedule extends Component {
  state = {
    open: false,
    title: '',
    start: jsDateToCalendarDate(new Date()),
    end: jsDateToCalendarDate(new Date()),
    desc: '',
    editing: false,
    currentEvent: null
  };

  initState = () => {
    this.setState({
      open: false,
      title: '',
      start: jsDateToCalendarDate(new Date()),
      end: jsDateToCalendarDate(new Date()),
      desc: '',
      editing: false
    })
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.initState();
  };

  handleAddSchedule = () => {
    this
      .props
      .addSchedule(this.state.title, this.state.desc, this.state.start, this.state.end);
    this.handleClose();
  }

  handleDeleteSchedule = () => {
    this
      .props
      .deleteSchedule(this.state.currentEvent.id);
    this.handleClose();
  }

  handleEditSchedule = () => {
    this
      .props
      .updateSchedule(this.state.currentEvent.id, this.state.title, this.state.desc, this.state.start, this.state.end);
    this.handleClose();
  }

  openEditDialog = (event) => {
    this.setState({
      open: true,
      title: event.title,
      start: event
        .resource
        .startTime
        .substring(0, 16)
        .replace(' ', 'T'),
      end: event
        .resource
        .endTime
        .substring(0, 16)
        .replace(' ', 'T'),
      desc: event.resource.content,
      editing: true,
      currentEvent: event.resource
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  render() {
    const {classes} = this.props;
    const isAdvisor = this.props.role === 'ROLE_ADVISOR'
    const addScheduleButton = isAdvisor
      ? null
      : <Button
        variant="extendedFab"
        aria-label="add"
        className={classes.button}
        color="primary"
        onClick={this.handleClickOpen}>
        <AddIcon className={classes.extendedIcon}/>
        新增安排
      </Button>
    return (
      <div className="schedule-container">
        <Calendar openEditDialog={this.openEditDialog}/> {addScheduleButton}
        {isAdvisor
          ? null
          : <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">
              {this.state.editing
                ? '编辑安排'
                : '新增安排'}
            </DialogTitle>
            <DialogContent>
              <form className={classes.container} noValidate>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="title"
                  label="标题"
                  type="name"
                  value={this.state.title}
                  className={classes.textField}
                  onChange={this.handleChange('title')}/>
                <TextField
                  fullWidth
                  margin="dense"
                  id="desc"
                  label="描述"
                  type="name"
                  value={this.state.desc}
                  onChange={this.handleChange('desc')}
                  className={classes.textField}/>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="start"
                  label="开始时间"
                  type="datetime-local"
                  value={this.state.start}
                  onChange={this.handleChange('start')}
                  className={classes.textField}
                  InputLabelProps={{
                  shrink: true
                }}/>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="end"
                  label="结束时间"
                  type="datetime-local"
                  value={this.state.end}
                  onChange={this.handleChange('end')}
                  className={classes.textField}
                  InputLabelProps={{
                  shrink: true
                }}/>
              </form>
            </DialogContent>
            <DialogActions>
              {this.state.editing
                ? <div>
                    <Button onClick={this.handleDeleteSchedule} color="secondary">
                      删除
                    </Button>
                    <Button onClick={this.handleEditSchedule} color="primary">
                      完成
                    </Button>
                  </div>
                : <Button onClick={this.handleAddSchedule} color="primary">
                  完成
                </Button>}
            </DialogActions>
          </Dialog>
}
        <ScheduleReview/>
      </div>
    );
  }
}
const mapStateToProps = state => ({role: state.app.role})

const mapDispatchToProps = dispatch => ({
  addSchedule: (title, desc, start, end) => dispatch(addSchedule(title, desc, start, end)),
  updateSchedule: (id, title, desc, start, end) => dispatch(updateSchedule(id, title, desc, start, end)),
  deleteSchedule: id => dispatch(deleteSchedule(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Schedule));
