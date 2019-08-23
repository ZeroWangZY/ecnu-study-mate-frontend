import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FailCourseUpdateWindow from './FailCourseUpdateWindow'
import {
    updateCourseTable, deleteCourseTable, setActioningFailCourse,
    addCourseTable
} from "../../redux/actions/information";
import { connect } from 'react-redux'
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 100,
  },
});

class CourseTable extends Component {
    state = {
        failCourse_update_win_open: false,
        failCourse_delete_win_open: false
    }
    handleUpdate = (id, student_id, course_id, course_name, credit, type) => {
        this.props.updateFailCourse(id, student_id, course_id, course_name, credit, type)
    }
    handleDelete = (id, student_id, course_id, course_name, credit, type) => {
        this.props.deleteFailCourse(id, student_id, course_id, course_name, credit, type)
    }
    handleAdd = (student_id, course_id, course_name, credit, type) => {
        this.props.addFailCourse(student_id, course_id, course_name, credit, type)
    }
    handleClickOpenUpdate = (item) => {
        this.setState({
            failCourse_update_win_open:true
        })
        item["action"]= "update"
        this.props.setActioningItem(item)
    }
    handleCloseUpdate = () =>{
        this.setState({failCourse_update_win_open:false})
    }
    handleClickOpenDelete = (item) => {
        this.setState({
            failCourse_update_win_open:true
        })
        item["action"]= "delete"
        this.props.setActioningItem(item)
    }
    handleClickOpenAdd = (studentID) =>{
        this.setState({
            failCourse_update_win_open:true
        })
        console.log(studentID)
        var item ={}
        item["action"]= "add"
        item["courseName"] = ""
        item["type"] = ""
        item["credit"] = 0
        item["studentID"] = studentID
        item["courseID"] = "0"
        item["id"] = ""
        this.props.setActioningItem(item)
    }
    // handleCloseDelete = () =>{
    //     this.setState({failCourse_update_win_open:false})
    // }
    render() {
        const {classes, data} = this.props;

        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>不及格的课程</TableCell>
                                <TableCell>课程分类</TableCell>
                                <TableCell>课程学分</TableCell>
                                <TableCell>课程操作</TableCell>
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
                                    <TableCell>
                                        <Button variant="contained" color="primary" className={classes.button}
                                                onClick={() => {this.handleClickOpenUpdate(item)}}>
                                            更新
                                        </Button>
                                        <Button variant="contained" color="secondary" className={classes.button}
                                                onClick={() => this.handleClickOpenDelete(item)}>
                                            删除
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            })}

                        </TableBody>
                    </Table>
                </Paper>
                <FailCourseUpdateWindow open={this.state.failCourse_update_win_open} handleClose={this.handleCloseUpdate} updateFailCourse={this.handleUpdate} deleteFailCourse={this.handleDelete}
                                        addFailCourse={this.handleAdd}/>
                <Button variant="contained" color="secondary" className={classes.button}
                        onClick={() => {this.handleClickOpenAdd(this.props.studentID)}}>
                    新增
                </Button>
             </div>

        );
    }
}

CourseTable.propTypes = {
  classes: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    setActioningItem: (item) => dispatch(setActioningFailCourse(item)),
    updateFailCourse: (id, student_id, course_id, course_name, credit, type) =>
        dispatch(updateCourseTable(id, student_id, course_id, course_name, credit, type)),
    deleteFailCourse: (id, student_id, course_id, course_name, credit, type) => dispatch(deleteCourseTable(id, student_id, course_id, course_name, credit, type)),
    addFailCourse: (student_id, course_id, course_name, credit, type) => dispatch(addCourseTable(student_id, course_id, course_name, credit, type))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CourseTable))
