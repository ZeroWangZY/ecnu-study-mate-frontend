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

class HomeworkItem extends Component {
  render () {
    const {classes, isDone} = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>作业标题xxxx</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                deadline: 2018/2/2
              </Typography>
            </div>
            {isDone
              ? <div className={classes.column} style={{color: '#43A047'}}>
                    已完成
                </div>
              : null}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div>
              作业描述巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" color="primary" disabled={isDone}>
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

export default withStyles (styles) (HomeworkItem);
