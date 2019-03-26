import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { connect } from 'react-redux'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { commitSurveyAPI } from '../../api/emotion'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { setSnackText } from '../../redux/actions/app'

const styles = theme => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  button: {
    margin: theme.spacing.unit
  },
  checked: {},
  input: {
    margin: theme.spacing.unit
  }
})

class EmotionSurvey extends Component {
  state = {
    open: false,
    other: ['', '', '', '', ''],
    check: [
      [false, false, false, false, false],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false]
    ]
  }

  handleCommit = () => {
    commitSurveyAPI(convertToApiFormat(this.state.check, this.state.other)).then(res => {
      this.props.setSnack('提交成功')
      this.handleClose()
    })
  }
  handleChange = (i, j) => event => {
    let check = this.state.check
    if (i === 1) {
      check[i][j] = event.target.value
    } else {
      check[i][j] = event.target.checked
    }
    this.setState({ check: check })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    const problem = [
      '一、请描述一下你现在所处的情境（可多选）',
      '二、请对你现在的情绪感受评分，0－10分，0-没有，5-中等强度，10-最大强度。（每项必选题）',
      '三、此刻你身体的感受是?（可多选）',
      '四、此刻你头脑中想法是?（可多选）',
      '五、你现在打算做什么?（可多选）'
    ]
    const answers = [
      ['在自习', '在上课', '玩游戏', '在聊天'],
      [
        '焦虑',
        '懊恼',
        '羞愧',
        '抑郁',
        '内疚',
        '沮丧',
        '恐惧',
        '生气',
        '烦躁',
        '厌倦',
        '愤怒',
        '忧伤',
        '轻松',
        '高兴',
        '自主感',
        '成就感',
        '愉悦'
      ],
      [
        '头疼',
        '脖子酸，僵硬',
        '胃不舒服',
        '背部肌肉紧张',
        '全身无力沉重',
        '手脚冰凉',
        '身体发抖',
        '身体暖暖的',
        '全身很舒服',
        '身体很轻松'
      ],
      [
        '我要再坚持学一会儿',
        '太难了，不如放弃算了',
        '真不想上课',
        '鸟儿叫声真悦耳',
        '在阳光下真好',
        '吃顿好的安慰自己',
        '没有人理解我'
      ],
      ['玩游戏', '听音乐', '做正念训练', '睡觉', '运动', '学习', '聊天', '美餐一顿', '吃零食']
    ]
    return (
      <div
        className="emotion-survey-container"
        style={{
          margin: 30
        }}
      >
        {problem.map((item, i) => {
          return i === 1 ? (
            <div key={i}>
              {item}
              {answers[i].map((item, j) => (
                <div key={j}>
                  {item}
                  <TextField
                    style={{
                      marginLeft: 20,
                      width: 30
                    }}
                    id="standard-number"
                    value={this.state.check[i][j]}
                    onChange={this.handleChange(i, j)}
                    type="number"
                    InputLabelProps={{}}
                    margin="normal"
                  />
                </div>
              ))}
              <Input
                value={this.state.other[i]}
                className={classes.input}
                placeholder="其他(选填)"
                inputProps={{
                  'aria-label': 'Description'
                }}
              />
              <TextField
                style={{
                  marginLeft: 20,
                  width: 30
                }}
                id="standard-number"
                value={this.state.check[i][17]}
                onChange={this.handleChange(i, 17)}
                type="number"
                InputLabelProps={{}}
                margin="normal"
              />
            </div>
          ) : (
            <div key={i}>
              <FormGroup>
                {item}
                {answers[i].map((item, j) => (
                  <div key={j}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={this.state.check[i][j]} onChange={this.handleChange(i, j)} value={item} />
                      }
                      label={item}
                    />
                  </div>
                ))}
              </FormGroup>
              <Input
                value={this.state.other[i]}
                className={classes.input}
                placeholder="其他(选填)"
                inputProps={{
                  'aria-label': 'Description'
                }}
              />
            </div>
          )
        })}
        <Button variant="contained" className={classes.button} onClick={this.handleClickOpen}>
          提交
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'是否确定提交?'}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleCommit} color="primary" autoFocus>
              确定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const convertToApiFormat = (keys, other) => {
  let result = []
  for (let i = 0; i < 5; i++) {
    if (i === 1) {
      result.push({
        keys: keys[i],
        other: other[i]
      })
    } else {
      let temp = []
      for (let j = 0; j < keys[i].length; j++) {
        if (keys[i][j] === true) {
          temp.push(j)
        }
      }
      result.push({
        keys: temp,
        other: other[i]
      })
    }
  }
  return result
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  setSnack: text => dispatch(setSnackText(text))
})

EmotionSurvey = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmotionSurvey)
export default withStyles(styles)(EmotionSurvey)
