import React, {Component} from 'react';
import Dnd from '../../common/dnd';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

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
});
class Schedule extends Component {
  render () {
    const {classes} = this.props;
    return (
      <div className="schedule-container">
        <Dnd />
        <Button
          variant="extendedFab"
          aria-label="add"
          className={classes.button}
          color="primary"
        >
          <AddIcon className={classes.extendedIcon} />
          新增安排
        </Button>
      </div>
    );
  }
}

export default withStyles (styles) (Schedule);
