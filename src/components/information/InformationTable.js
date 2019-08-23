import React ,{ Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from "@material-ui/core/es/Button/Button";
import {connect} from "react-redux";
import {updateInfoTab} from "../../redux/actions/information";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto'
  },
  table: {
    // minWidth: 100,
  }
})

class InformationTable extends Component {
    handleClickOpenUpdate = (studentID) =>{
        this.state.updateInfo(studentID)
    }

    render() {
        const {classes, data} = this.props

        return (
            <div>
                <Paper className={classes.root}>
                    {data === null ? (
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
                        </Table>
                    ) : (
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
                    )}
                </Paper>
                {/*<Button variant="contained" color="secondary" className={classes.button}*/}
                        {/*onClick={() => {*/}
                            {/*this.handleClickOpenUpdate(this.props.studentID)*/}
                        {/*}}>*/}
                    {/*修改*/}
                {/*</Button>*/}
            </div>
        )
    }
}

InformationTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    updateInfo: (studentID) => dispatch(updateInfoTab(studentID))
    })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(InformationTable))
