import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { changePerInfo, failMes } from '../../redux/actions/changePerInfo'

import { connect } from 'react-redux'
const styles = theme => ({
  container: {
    flexWrap: 'wrap',
    margin: theme.spacing.unit,
    display: 'table-caption'
  },
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    display: 'block',
    margin: `${theme.spacing.unit}px 0`
  }
})

class ChangePerInfo extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
    oldPwd: '',
    sex: 'male',
    phone: ''
  }
  initState = () => {
    this.setState({
      name: '',
      username: '',
      email: '',
      password1: '',
      password2: '',
      oldPwd: '',
      sex: 'male',
      phone: ''
    })
  }
  init = name => event => {
    this.setState({
      [name]: ''
    })
  }
  handleSend = () => {
    console.log('1111')
    let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
    let mobile = /^1[3|5|8]\d{9}$/
    let phone = /^0\d{2,3}-?\d{7,8}$/
    if (
      this.state.oldPwd === '' ||
      this.state.password1 === '' ||
      this.state.password2 === '' ||
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.username === '' ||
      this.state.sex === '' ||
      this.state.phone === ''
    ) {
      this.props.failMes('所填不能为空！请重新输入！')
      this.initState()
    } else if (this.state.password1 !== this.state.password2) {
      this.props.failMes('两次新密码不一致，请重新输入！')
      this.init('password1')
      this.init('password2')
      //   this.initState();
    } else if (this.state.password1.length < 6 || this.state.password1.length > 12) {
      this.props.failMes('密码长度应该为6～12位，请重新输入！')
      this.init('password1')
      this.init('password2')
    } else if (!myReg.test(this.state.email)) {
      this.props.failMes('邮箱格式不对！请重新输入！')
      this.init('email')
    } else if (!(mobile.test(this.state.phone) || phone.test(this.state.phone))) {
      this.props.failMes('手机格式不正确，请输入格式如下："13590871234"或者"020-12345678"')
      this.init('phone')
    } else {
      this.props.send(
        this.state.name,
        this.state.username,
        this.state.email,
        this.state.password1,
        this.state.oldPwd,
        this.state.sex,
        this.state.phone
      )
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props
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
          id="username" //学号
          label="学号"
          type="number"
          value={this.state.username}
          onChange={this.handleChange('username')}
        />
        <TextField
          required
          margin="dense"
          id="pw"
          label="密码"
          type="password"
          value={this.state.oldPwd}
          onChange={this.handleChange('oldPwd')}
        />
        <TextField
          required
          margin="dense"
          id="newPW1"
          label="新密码"
          type="password"
          value={this.state.password1}
          onChange={this.handleChange('password1')}
        />
        <TextField
          required
          margin="dense"
          id="newPW2"
          label="重复新密码"
          type="password"
          value={this.state.password2}
          onChange={this.handleChange('password2')}
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
        <TextField
          required
          margin="dense"
          id="phone"
          label="电话"
          type="number"
          value={this.state.phone}
          onChange={this.handleChange('phone')}
        />
        <RadioGroup
          aria-label="Gender"
          name="gender"
          className={classes.group}
          value={this.state.sex}
          onChange={this.handleChange('sex')}
        >
          <FormControlLabel value="male" control={<Radio color="primary" />} label="男" />
          <FormControlLabel value="female" control={<Radio color="primary" />} label="女" />
        </RadioGroup>
        <Button onClick={() => this.handleSend()} color="primary">
          提交
        </Button>
      </div>
    )
  }
}
ChangePerInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
  failMes: PropTypes.func.isRequired
}
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  send: (name, username, email, password, oldPwd, sex, phone) =>
    dispatch(changePerInfo(name, username, email, password, oldPwd, sex, phone)),
  failMes: ms => dispatch(failMes(ms))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChangePerInfo))
