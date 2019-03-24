import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux'
import {deleteScheduleReview} from '../../redux/actions/schedule';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  root: {},
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
	},
	container: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

class ReviewEditingWindow extends Component {

	handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };
  
  confirm = () => {
    this.props.addReview(this.state.overview, this.state.reason)

    this.setState({
      overview: '',
      reason: ''
    })

    this.props.handleClose()
  }
	
	state = {
		overview: '',
		reason: ''
	}
  render() {
    const {classes, review} = this.props;

    return (
      <div className={classes.root}>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"新增评价"}</DialogTitle>
					<DialogContent>
						<TextField
							id="filled-multiline-static"
							label="综述"
							multiline
							fullWidth
							rows="4"
							className={classes.textField}
							margin="dense"
							value={this.state.overview}
							onChange={this.handleChange('overview')}
						/>
						<TextField
							id="filled-multiline-static"
							label="学习困难原因"
							multiline
							fullWidth
							rows="2"
							className={classes.textField}
							margin="dense"
							helperText="(1.学习态度、基础/学习方法； 2.社会工作：花在学习上时间太少； 3.网络游戏；情感；家庭；性格； 4.其他)"
							value={this.state.reason}
							onChange={this.handleChange('reason')}
						/>
					</DialogContent>
          
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              取消
            </Button>
            <Button
              color="secondary"
              onClick={this.confirm}
              autoFocus>
              确定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(ReviewEditingWindow)