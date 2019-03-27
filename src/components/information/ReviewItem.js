import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { isNotNullAndUndefined } from '../../util/object';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto'
  },
  container: {
    margin: 12
  },
  text: {
    margin: 8,
    padding: 4
  }
})

function ReviewItem(props) {
  const { classes, data } = props
  const overview = data.answerList[0]
  const reason = data.answerList[1]
  if (isNotNullAndUndefined(overview) && isNotNullAndUndefined(reason)) {
    return (
      <Paper className={classes.root}>
        <div className={classes.container}>
          <Typography variant="h6" className={classes.text}>
            个人综述
          </Typography>
          <Typography className={classes.text}>{overview.content === '' ? '无' : overview.content}</Typography>
          <Divider variant="middle" />
          <Typography variant="h6" className={classes.text}>
            学习困难原因
          </Typography>
          <Typography variant="caption" className={classes.text}>
            (1.学习态度、基础/学习方法； 2.社会工作：花在学习上时间太少； 3.网络游戏；情感；家庭；性格； 4.其他)
          </Typography>
          <Typography className={classes.text}>{reason.content}</Typography>
          <Divider variant="middle" />
          <Typography variant="h6" className={classes.text}>
            评价者
          </Typography>
          <Typography className={classes.text}>
            <div style={{ display: 'inline-block' }}>{data.userName}</div>
            <div style={{ display: 'inline-block', float: 'right' }}>{data.time}</div>
          </Typography>
        </div>
      </Paper>
    )
  }
  return null
  
}

ReviewItem.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReviewItem)
