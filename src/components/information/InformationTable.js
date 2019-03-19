import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function InformationTable(props) {
  const { classes, data } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>姓名</TableCell>
            <TableCell numeric>学号</TableCell>
            <TableCell numeric>年级</TableCell>
            <TableCell numeric>绩点</TableCell>
            <TableCell numeric>学分</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={data.studentID}>
                <TableCell component="th" scope="row">
                    {data.studentName}
                </TableCell>
                <TableCell numeric>{data.studentID}</TableCell>
                <TableCell numeric>{data.grade}</TableCell>
                <TableCell numeric>{data.gpa}</TableCell>
                <TableCell numeric>{data.credit}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

InformationTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InformationTable);