import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {connect} from "react-redux";

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  checked: {}
};

class EmotionSurvey extends Component {
  state = {
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
    check: [
      [false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false],
      [false,false,false,false,false,false,false,false,false,false,false],
    ]
  };

  handleChange = (i, j) => event => {
    let check = this.state.check;
    check[i][j] = event.target.checked
    this.setState({
      check: check
    });
  };

  render() {
    const {classes} = this.props;
    const problem = ['一、请描述一下你现在所处的情境（可多选）', '二、请对你现在的情绪感受评分，0－10分，0-没有，5-中等强度，10-最大强度。（每项必选题）', '三、此刻你身体的感受是?（可多选）', '四、此刻你头脑中想法是?（可多选）', '五、你现在打算做什么?（可多选）']
    const answers = [
      [
        '在自习', '在上课', '玩游戏', '在聊天'
      ],
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
      [
        '玩游戏',
        '听音乐',
        '做正念训练',
        '睡觉',
        '运动',
        '学习',
        '聊天',
        '美餐一顿',
        '吃零食'
      ]
    ]
    return (
      <div className="emotion-survey-container">
        {problem.map((item, i) => (
          <div key={i}>
            <FormGroup>
              {item}
              {answers[i].map((item, j) => (
                <div key={j}>
                  <FormControlLabel
                    control={< Checkbox checked = {
                    this.state.check[i][j]
                  }
                  onChange = {
                    this.handleChange(i,j)
                  }
                  value={item} />}
                    label={item}/>
                </div>
              ))}
            </FormGroup>
          </div>
        ))}

      </div>
    );

  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

EmotionSurvey = connect(mapStateToProps, mapDispatchToProps)(EmotionSurvey);
export default withStyles(styles)(EmotionSurvey)
