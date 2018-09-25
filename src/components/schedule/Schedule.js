import React, { Component } from 'react';
import Dnd from '../../common/dnd';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { addScheduleAPI } from '../../api/api';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    right: 6,
    bottom: 6
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Schedule extends Component {

  state = {
    open: false,
    title: '',
    start: '2018-08-01T10:00',
    end: '2018-08-01T10:00',
    desc: '',
    editing: false,
    currentEvent: null
  };

  initState = () => {
    this.setState({
      open: false,
      title: '',
      start: '2018-08-01T10:00',
      end: '2018-08-01T10:00',
      desc: '',
      editing: false,
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAddSchedule = () => {
    addScheduleAPI(this.state.title, this.state.desc, this.state.start, this.state.end).then(res => {
      
    })
  }

  handleDeleteSchedule = () => {
    
  }

  handleEditingSchedule = () => {

  }

  openEditDialog = (event) => {
    this.setState({
      open: true,
      title: event.title,
      start: event.resource.startTime.substring(0, 16).replace(' ', 'T'),
      end: event.resource.endTime.substring(0, 16).replace(' ', 'T'),
      desc: event.resource.content,
      editing: true,
      currentEvent: event.resource
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="schedule-container">
        <Dnd openEditDialog={this.openEditDialog} />
        <Button
          variant="extendedFab"
          aria-label="add"
          className={classes.button}
          color="primary"
          onClick={this.handleClickOpen}
        >
          <AddIcon className={classes.extendedIcon} />
          新增安排
        </Button>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"新建安排"}
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
                onChange={this.handleChange('title')}
              />
              <TextField
                fullWidth
                margin="dense"
                id="desc"
                label="描述"
                type="name"
                value={this.state.desc}
                onChange={this.handleChange('desc')}
                className={classes.textField}
              />
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
                  shrink: true,
                }}
              />
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
                  shrink: true,
                }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            {this.state.editing ?
              <div>
                <Button onClick={this.handleDeletingSchedule} color="secondary">
                  删除
                  </Button>
                <Button onClick={this.handleEditingSchedule} color="primary">
                  完成
                  </Button>
              </div> :
              <Button onClick={this.handleAddSchedule} color="primary">
                完成
            </Button>}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Schedule);
