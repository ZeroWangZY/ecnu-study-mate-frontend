import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { addScheduleReview } from '../../redux/actions/schedule';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    root: {
      flexGrow: 1
    }
  }
});

class AddScheduleReview extends Component {

  state = {
    content: ''
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  addReview = () => {
    this.props.addReview(this.state.content)
    this.setState({
      content: ''
    })
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid item xs={10}>
          <TextField
            label="评论"
            style={{
            margin: 8
          }}
            value={this.state.content}
            placeholder="请输入评论"
            fullWidth
            onChange={this.handleChange('content')}
            margin="normal"
            InputLabelProps={{
            shrink: true
          }}/>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={1}>
          <Button onClick={this.addReview} variant="contained" color="primary" className={classes.button}>
            发送
          </Button>
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  addReview: content => dispatch(addScheduleReview(content))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddScheduleReview));
