import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from "react-redux";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2
    },
    button: {
        margin: theme.spacing.unit
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },
})

class FailCourseUpdateWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courseID:this.props.data.actioningFailCourse.courseID,
            courseName:this.props.data.actioningFailCourse.courseName,
            id:this.props.data.actioningFailCourse.id,
            type:this.props.data.actioningFailCourse.type,
            failCourseName:this.props.data.actioningFailCourse.courseName,
            credit: this.props.data.actioningFailCourse.credit,
            isDisabled: this.props.data.actioningFailCourse.action === "delete",
            action: this.props.data.action
        }
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
        this.setState({
            courseID:nextProps.data.actioningFailCourse.courseID,
            courseName:nextProps.data.actioningFailCourse.courseName,
            id:nextProps.data.actioningFailCourse.id,
            type:nextProps.data.actioningFailCourse.type,
            studentID:nextProps.data.actioningFailCourse.studentID,
            credit: nextProps.data.actioningFailCourse.credit,
            isDisabled: nextProps.data.actioningFailCourse.action === "delete",
            action:nextProps.data.actioningFailCourse.action
        });
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    confirm = () => {
        this.state.action === "update" ? this.props.updateFailCourse(this.state.id, this.state.studentID,this.state.courseID,this.state.courseName, this.state.credit, this.state.type) :
            this.state.action === "delete" ? this.props.deleteFailCourse(this.state.id, this.state.studentID,this.state.courseID,this.state.courseName, this.state.credit, this.state.type) :
                this.props.addFailCourse(this.state.studentID,this.state.courseID,this.state.courseName, this.state.credit, this.state.type)
        this.props.handleClose()
    }


    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.action === "update" ? '更新不及格课程信息': this.state.action === "add" ? "新增不及格课程信息" : "删除不及格课程信息"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            disabled={this.state.isDisabled}
                            id="filled-multiline-static"
                            label="不及格课程名称"
                            multiline
                            fullWidth
                            className={classes.textField}
                            margin="dense"
                            value={this.state.courseName}
                            onChange={this.handleChange('courseName')}
                        />
                        <FormControl className={classes.formControl} margin="dense" >
                            <InputLabel htmlFor="type-simple">分类</InputLabel>
                            <Select
                                fullWidth
                                required
                                value={this.state.type}
                                onChange={this.handleChange('type')}
                                disabled={this.state.isDisabled}
                            >
                                <MenuItem value={"专业必修课"}>专业必修课</MenuItem>
                                <MenuItem value={"专业选修课"}>专业选修课</MenuItem>
                                <MenuItem value={"通识必修课"}>通识必修课</MenuItem>
                                <MenuItem value={"通识选修课"}>通识选修课</MenuItem>
                                <MenuItem value={"其他"}>其他</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            id="credit"
                            label="学分"
                            type="number"
                            value={this.state.credit}
                            disabled={this.state.isDisabled}
                            onChange={this.handleChange('credit')}
                        />

                            <TextField
                            required
                            fullWidth
                            margin="dense"
                            id="course_id" //学号
                            label="课程编号"
                            type="number"
                            value={this.state.courseID}
                            disabled={this.state.isDisabled}
                            onChange={this.handleChange('courseID')}
                            />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            取消
                        </Button>
                        <Button color="secondary" onClick={this.confirm} autoFocus>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    data: state.information
})
const mapDispatchToProps = dispatch => ({
})

const FailCourseUpdateWindowPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(FailCourseUpdateWindow)

export default withStyles(styles, { withTheme: true })(FailCourseUpdateWindowPage)
