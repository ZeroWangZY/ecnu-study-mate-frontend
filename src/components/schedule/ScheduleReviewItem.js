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

const styles = theme => ({
  root: {},
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  }
});

class ScheduleReviewItem extends Component {
  state = {
    openDialog: false
  };
  handleClickOpen = () => {
    this.setState({openDialog: true});
  };

  handleClose = () => {
    this.setState({openDialog: false});
  };

  render() {
    const {classes, review} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={16}>
            <Grid item>
              <Avatar>W</Avatar>
              <Typography variant="caption" gutterBottom align="center">
                {review.reviewerID}
              </Typography>
            </Grid>
            <Grid item sm>
              <Typography style={{
                minHeight: 80
              }}>{review.content}</Typography>
              <Typography variant="caption" gutterBottom align="right">
                {this.props.studentId === review.reviewerID
                  ? <Button
                      color="secondary"
                      className={classes.button}
                      onClick={this.handleClickOpen}>
                      删除
                    </Button>
                  : null}
                {review
                  .time
                  .substring(0, 19)}
              </Typography>

            </Grid>
          </Grid>
        </Paper>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"确定要删除这条评论吗?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button
              onClick={() => {
              this
                .props
                .delete(review.reviewID);
              this.handleClose()
            }}
              color="secondary"
              autoFocus>
              删除
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({studentId: state.app.studentId})
const mapDispatchToProps = dispatch => ({
  delete: id => dispatch(deleteScheduleReview(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScheduleReviewItem))