import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {},
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
    }
})
class StudentAddingWindow extends Component {
    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    confirm = () => {
        this.props.addStudent(this.state.student_id)

        this.setState({
            student_type:'',
            student_name: '',
            student_id: '',
            student_grade: '',
            student_GPA: '',
            student_credit: ''
        })

        this.props.handleClose()
    }

    state = {
        student_type: '',
        student_name: '',
        student_id: '',
        student_grade: '',
        student_GPA: '',
        student_credit: ''
    }
    render() {
        const { classes } = this.props


        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'新增学生'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="filled-multiline-static"
                            label="学号"
                            rows="4"
                            fullWidth
                            className={classes.textField}
                            margin="dense"
                            value={this.state.student_id}
                            onChange={this.handleChange('student_id')}
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

export default withStyles(styles)(StudentAddingWindow)
