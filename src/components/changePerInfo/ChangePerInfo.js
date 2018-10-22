import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {changePerInfo, failMes} from "../../redux/actions/changePerInfo";


import {connect} from "react-redux";
const styles = theme => ({
    container: {
        flexWrap: 'wrap',
        margin: theme.spacing.unit,
        display: 'table-caption'
    }

});

class ChangePerInfo extends Component{

    state ={
        password:"",
        newPassword:"",
        newPassword2:"",
        name:"",
        email:""
    }
    initState =() =>{
        this.setState({
            password:"",
            newPassword:"",
            newPassword2:"",
            name:"",
            email:""
        })
    }
    handleSend = () => {
        console.log("1111");
        let myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if(this.state.password===""||this.state.newPassword===""||this.state.newPassword2===""||this.state.name===""||this.state.email===""){
            this.props.failMes("所填不能为空！请重新输入！");
            this.initState();
        }
        else if(this.state.newPassword!==this.state.newPassword2){
            this.props.failMes("两次新密码不一致，请重新输入！");
            this.initState();
        }else if(this.state.newPassword.length<6||this.state.newPassword.length>12){
            this.props.failMes("密码长度应该为6～12位，请重新输入！");
            this.initState();
        }
        else if(!myReg.test(this.state.email)){
            this.props.failMes("邮箱格式不对！请重新输入！");
            this.initState();
        }else {
            this.props.send(this.state.password,this.state.newPassword,this.state.name,this.state.email);
        }

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label="姓名"
                        type="name"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="pw"
                        label="密码"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                    />
                     <TextField
                         required
                         margin="dense"
                         id="newPW1"
                         label="新密码"
                         type="password"
                         value={this.state.newPassword}
                         onChange={this.handleChange('newPassword')}
                     />
                     <TextField
                         required
                         margin="dense"
                         id="newPW2"
                         label="重复新密码"
                         type="password"
                         value={this.state.newPassword2}
                         onChange={this.handleChange('newPassword2')}
                     />
                     <TextField
                         required
                         margin="dense"
                         id="email"
                         label="邮箱"
                         type="email"
                         value={this.state.email}
                         onChange={this.handleChange('email')}
                     />
                <Button onClick={()=>this.handleSend()} color="primary">提交</Button>
            </div>
        )
    }


}
ChangePerInfo.propTypes ={
    classes: PropTypes.object.isRequired,
    send:PropTypes.func.isRequired,
    failMes:PropTypes.func.isRequired
}
const mapStateToProps = state =>({})
const mapDispatchToProps = dispatch =>({
    send: (password,newPassword,name,email) => dispatch(changePerInfo(password,newPassword,name,email)),
    failMes:(ms) =>dispatch(failMes(ms))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ChangePerInfo))
