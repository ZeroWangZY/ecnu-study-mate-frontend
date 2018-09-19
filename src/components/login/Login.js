import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { setLogin } from '../../redux/actions';
import { connect } from 'react-redux'
import { loginAPI, getMonthScheduleAPI } from '../../api/api';

class Login extends React.Component {
    state = {
        id: "",
        password: ""
    };

    handleLogin = () => {

        loginAPI(10165101228, 123).then(res => {
            this.props.login(this.state.id, this.state.password)
            getMonthScheduleAPI();
        })

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { fullScreen } = this.props;
        let open = true;
        open = !this.props.app.isLoginned;
        return (
            <div>
                <Dialog
                    open={open}
                    fullScreen={fullScreen}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">请先登录</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="id"
                            label="账号"
                            type="id"
                            value={this.state.id}
                            onChange={this.handleChange('id')}
                            fullWidth
                        />
                        <TextField
                            required
                            margin="dense"
                            id="password"
                            label="密码"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleLogin} color="primary">
                            登录
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app
})

const mapDispatchToProps = dispatch => ({
    login: (id, password) => dispatch(setLogin(id, password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withMobileDialog()(Login));