import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReviewItem from './ReviewItem';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
  },
  text: {
    margin: 12
  }
});

function Review(props) {
  const { classes, data } = props;

  return (
      <div>
        <Typography variant="h6" gutterBottom>
          学生评价
        </Typography>
        {data.map(
          (item, index) => <ReviewItem data={item} key={'aw' + index}/>
        )}
      </div>
    
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);