import React, {Component} from 'react';
import HomeworkManageItem from './HomeworkManageItem'
import {connect} from "react-redux"
import { withStyles } from '@material-ui/core/styles';
import {refreshHomeworkManage} from "../../redux/actions/homeworkManage";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import {addHomework} from "../../redux/actions/homeworkManage"
import {deleteHomework} from "../../redux/actions/homeworkManage"
import {updateHomework} from "../../redux/actions/homeworkManage"
import {getReceiverId, getStudentId} from "../../redux/store";

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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class HomeworkManage extends Component{

    state = {
        open:false,
        editing:false,
        isDelete:false,
        homeworkID:1,
        title: "homeworkTest",
        state:"finish",
        content: "homeworkcontentTest",
        deadline: '2018-08-01T10:00',
        publisher: getStudentId(),
        receiver: getReceiverId(),
        homework_file:"",
        grade:"",
        isDone:false
    };

    componentDidMount() {
        this.props.refreshHomeworkManage();
    }

    initState = () =>{
        this.setState({
            open:false,
            editing:false,
            isDelete:false,
            homeworkID:1,
            title: "homeworkTest",
            state:"finish",
            content: "homeworkcontentTest",
            deadline: '2018-08-01T10:00',
            publisher: getStudentId(),
            receiver: getReceiverId(),
            homework_file:"",
            grade:"",
            isDone:false
        })
    }

    openEditDialog = (event) =>{
        this.setState({
            open:true,
            editing:true,
            isDelete:false,
            homeworkID:event.homeworkID,
            title:event.title,
            state:event.state,
            content: event.content,
            deadline: event.deadline,
            publisher: event.publisher,
            receiver: event.receiver,
            homework_file:event.homework_file,
            grade:event.grade==null?"":event.grade,
            isDone:event.isDone
        })
    }

    openDeleteDialog= (event) =>{
        this.setState({
            open:true,
            editing:false,
            isDelete:true,
            homeworkID:event.homeworkID,
            title:event.title,
            state:event.state,
            content: event.content,
            deadline: event.deadline,
            publisher: event.publisher,
            receiver: event.receiver,
            homework_file:event.homework_file,
            grade:event.grade==null?"":event.grade,
            isDone:event.isDone
        })
    }

    handleClickOpen = () =>{
        this.setState({
            open:true
        })
    }

    handleClose =() =>{
        this.initState();
    }

    handleAddHomework = () =>{
        this.props.addHomework(this.state.title,this.state.content,this.state.deadline,this.state.publisher,this.state.receiver);
        this.handleClose();
    }

    handleDeleteHomework = () =>{
        this.props.deleteHomework(this.state.homeworkID);
        this.handleClose();
    }

    handleEditHomework = () =>{
        this.props.editHomework(this.state.homeworkID,this.state.title,this.state.content,this.state.deadline,this.state.receiver,this.state.grade,this.state.state);
        this.handleClose();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };



    render(){
        const { classes } = this.props;
        let currentTime = new Date().getTime();
        return (
            <div className="homeworkManage-container" style={{textAlign: 'center'}}>
                {
                    this.props.homeList.map((item,i) =>{
                        console.log(item);
                        return (
                            <HomeworkManageItem key={item.homeworkID + currentTime} item={item} openEditDialog={this.openEditDialog.bind(this)} openDeleteDialog={this.openDeleteDialog.bind(this)}/>
                        )
                    })
                }
                <div className="homeworkManage-addButton">


                    {/*新增按钮*/}
                <Button
                    variant="extendedFab"
                    aria-label="add"
                    className={classes.button}
                    color="primary"
                    onClick={this.handleClickOpen}
                >
                    <AddIcon className={classes.root} />
                    新增作业
                </Button>

                    {/*弹出框*/}
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.state.isDelete?
                            '删除作业':
                            this.state.editing ? '编辑作业' : '新增作业'}
                    </DialogTitle>

                    <DialogContent>
                        <form className={classes.container} noValidate>
                            {this.state.isDelete ?
                                <div>
                                    <div>title:{this.state.title}</div>
                                    <div>content:{this.state.content}</div>
                                </div>:
                                this.state.editing?
                                <div>
                                    <TextField
                                        required
                                        fullWidth
                                        margin="dense"
                                        id="title"
                                        label="标题"
                                        type="name"
                                        value={this.state.title}
                                        className={classes.textField}
                                        onChange={this.handleChange('title')}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        id="content"
                                        label="作业内容"
                                        type="name"
                                        value={this.state.content}
                                        onChange={this.handleChange('content')}
                                        className={classes.textField}
                                    />
                                    <TextField
                                        required
                                        margin="dense"
                                        id="content"
                                        label="成绩"
                                        type="number"
                                        value={this.state.grade}
                                        onChange={this.handleChange('grade')}
                                        className={classes.textField}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        margin="dense"
                                        id="deadline"
                                        label="截止时间"
                                        type="datetime-local"
                                        value={this.state.deadline}
                                        onChange={this.handleChange('deadline')}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </div>:
                                <div>
                                    <TextField
                                        required
                                        fullWidth
                                        margin="dense"
                                        id="title"
                                        label="标题"
                                        type="name"
                                        value={this.state.title}
                                        className={classes.textField}
                                        onChange={this.handleChange('title')}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        id="content"
                                        label="作业内容"
                                        type="name"
                                        value={this.state.content}
                                        onChange={this.handleChange('content')}
                                        className={classes.textField}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        margin="dense"
                                        id="deadline"
                                        label="截止时间"
                                        type="datetime-local"
                                        value={this.state.deadline}
                                        onChange={this.handleChange('deadline')}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        margin="dense"
                                        id="receiver"
                                        label="receiver学号"
                                        type="number"
                                        value={this.state.receiver}
                                        onChange={this.handleChange('receiver')}
                                        className={classes.textField}
                                    />
                                </div>

                            }

                        </form>
                    </DialogContent>

                    <DialogActions>
                        {this.state.isDelete ? <div>
                                <Button onClick={this.handleDeleteHomework} color="secondary">
                                    确认删除
                                </Button>
                            </div>:
                            this.state.editing ?
                            <div>
                                <Button onClick={this.handleEditHomework} color="primary">
                                    完成
                                </Button>
                            </div> :
                            <Button onClick={this.handleAddHomework} color="primary">
                                完成
                            </Button>}
                    </DialogActions>
                </Dialog>
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    homeList:state.homeworkManage
})
const mapDispatchToProps = dispatch => ({
    refreshHomeworkManage: () => dispatch(refreshHomeworkManage()),
    addHomework:(title,content1,deadline,publisher,receiver) => dispatch(addHomework(title,content1,deadline,publisher,receiver)),
    deleteHomework:(homeworkID) => dispatch(deleteHomework(homeworkID)),
    editHomework:(homeworkID,title,content1,deadline,receiver,grade,state)=>dispatch(updateHomework(homeworkID,title,content1,deadline,receiver,grade,state))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(HomeworkManage));

