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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 100,
  },
});

function CourseTable(props) {
  const { classes, data } = props;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        不及格的课程
      </Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>不及格的课程</TableCell>
              <TableCell>课程分类</TableCell>
              <TableCell>课程学分</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {data.map((item, index) => {
                  return <TableRow key={'' + data.id + index}>
                  <TableCell component="th" scope="row">
                      {item.courseName}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.credit}</TableCell>
              </TableRow>
              })}
              
          </TableBody>
        </Table>
      </Paper>
    </div>
    
  );
}

CourseTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseTable);