import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';

const styles = {
  row: {
    display: 'inline-block',
    justifyContent: 'center',
    float: 'left',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 50,
    height: 50,
  },
};

class ConversationItem extends Component {
  render () {
    const {classes} = this.props;
    return (
      <div
        className="conversation-container"
        style={{maxWidth: 600, margin: '10px auto'}}
      >
        <Divider />

        <div className={classes.row}>
          <Avatar
            alt="Adelle Charles"
            src="https://pic1.zhimg.com/da8e974dc_m.jpg"
            className={classNames (classes.avatar, classes.bigAvatar)}
          />
        </div>
        <div style={{margin: '10px 0 0 70px', textAlign: 'left'}}>
          <a style={{color: '#259'}}>
            xxx
          </a>
          : 啊发觉发掘撒撒娇悲剧啊悲剧吧基本得基本得啊基本得啊基本得啊基本得啊基本得啊基本得啊基本得啊啊发觉得啊发觉v觉得啊发觉发掘撒撒娇悲剧啊悲剧吧基本v觉得啊发觉发掘撒撒娇悲剧啊悲剧吧基本v觉得啊发觉发掘撒撒娇悲剧啊悲剧吧基本v觉得啊发觉发掘撒撒娇悲剧啊悲剧吧基本v觉得啊发觉发掘撒撒娇悲剧啊悲剧吧基本v觉得
        </div>
        <div style={{marginLeft: '70px',marginTop: 6, textAlign: 'right', fontSize: 12}}>
            <span style={{float: 'left'}}>6月28日 19:52</span>
            <a style={{color: '#259'}}>查看对话</a> | 
            <a style={{color: '#259'}}>回复</a> | 
            <a style={{color: '#259'}}>删除</a>
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (ConversationItem);
