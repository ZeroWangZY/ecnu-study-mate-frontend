import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux'
import {uploadFiles} from "../../redux/actions/upload";

const styles = theme => ({
  root: {
    maxWidth: 420,
    margin: 12,
    display: 'inline-block',
    verticalAlign: 'top',
  },
  heading: {
    fontSize: theme.typography.pxToRem (15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem (15),
    color: theme.palette.text.secondary,
  },
  thirdHeading:{
    fontSize: theme.typography.pxToRem (10),
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '50%',
  },
  columnRight:{
    flexBasis: '50%',
    padding:'0 10px'
  },
  content:{
    textAlign: 'left'
  },
  row: {
    display: 'block',
    width: '100%'
  },
  bottom_right:{
    textAlign:'right',
    padding: '10px 0'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

class HomeworkItem extends Component {

  state = {
      homeworkID:this.props.item.homeworkID,
      title:this.props.item.title,
      content:this.props.item.content,
      deadline:this.props.item.deadline,
      state:this.props.item.deadline,
      publisher:this.props.item.publisher,
      receiver:this.props.item.receiver,
      grade:this.props.item.grade,
      homework_file:this.props.item.homework_file,
      isDone:this.props.item.state==="finish"
  }

  handleFormSubmit = (data) =>{
      data.preventDefault();
      let formData = new FormData();
      formData.append('file',data.target.file.files[0]);
      this.props.uploadFiles1(formData);
  }
  render () {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{this.state.title}</Typography>
            </div>

            {this.state.isDone
              ? <div className={classes.columnRight} style={{color: '#43A047'}}>
                    已完成
                </div>
              : <div className={classes.columnRight} style={{color: '#c00'}}>
                    待完成
                </div>}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.row}>
                <div className={classes.content}>
                    {this.state.content}
                </div>
                <div className={classes.bottom_right}>
                    <Typography className={classes.thirdHeading}>
                        deadline: {this.state.deadline}
                    </Typography>
                </div>
            </div>

          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <form className={classes.container} onSubmit={this.handleFormSubmit} >
              <div>
                <SendIcon/>
                <input type="file" name="homeworkFile"/>
              </div>
                <Button type="submit" size="small" color="primary" disabled={this.state.isDone} >
                    去提交
                </Button>
            </form>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

HomeworkItem.propTypes = {
  classes: PropTypes.object.isRequired,
  uploadFiles1:PropTypes.func.isRequired,
};

const mapStateToProps = state =>({
})
const mapDispatchToProps = dispatch =>({
    uploadFiles1: (data) => dispatch(uploadFiles(data))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(HomeworkItem))
