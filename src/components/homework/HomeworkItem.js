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
import { connect } from 'react-redux'

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
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
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
});

class HomeworkItem extends React.Component {
  constructor(props){
      super(props);
  }

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
  render () {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{this.state.title}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                deadline: {this.state.deadline}
              </Typography>
            </div>
            {this.state.isDone
              ? <div className={classes.column} style={{color: '#43A047'}}>
                    已完成
                </div>
              : null}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div>
                {this.state.content}
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" color="primary" disabled={this.state.isDone}>
              去提交
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

HomeworkItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
})
const mapDispatchToProps = dispatch =>({
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(HomeworkItem))
