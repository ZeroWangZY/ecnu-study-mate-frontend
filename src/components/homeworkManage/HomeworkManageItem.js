import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { connect } from 'react-redux'
import { downloadFiles, failUploadMes } from '../../redux/actions/upload'
const styles = theme => ({
  root: {
    maxWidth: 420,
    margin: 12,
    display: 'inline-block',
    verticalAlign: 'top'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  thirdHeading: {
    fontSize: theme.typography.pxToRem(10)
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexBasis: '50%'
  },
  columnRight: {
    flexBasis: '50%',
    padding: '0 10px'
  },
  row: {
    display: 'block',
    width: '100%'
  },
  bottom_right: {
    textAlign: 'right',
    padding: '10px 0'
  },
  content: {
    textAlign: 'left'
  },

  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  down: {
    display: 'contents'
  }
})

class HomeworkManageItem extends Component {
  state = {
    homeworkID: this.props.item.homeworkID,
    title: this.props.item.title,
    content: this.props.item.content,
    deadline: this.props.item.deadline,
    state: this.props.item.state,
    publisher: this.props.item.publisher,
    receiver: this.props.item.receiver,
    grade: this.props.item.grade,
    homework_file: this.props.item.homework_file,
    isDone: this.props.item.state === 'finish',
    isMark: this.props.item.state === 'mark', //是否评分
    item: this.props.item
  }

  componentDidMount() {
    this.initState()
  }

  initState = () => {
    this.setState({
      homeworkID: this.props.item.homeworkID,
      title: this.props.item.title,
      content: this.props.item.content,
      deadline: this.props.item.deadline,
      state: this.props.item.state,
      publisher: this.props.item.publisher,
      receiver: this.props.item.receiver,
      grade: this.props.item.grade == null ? '' : this.props.item.grade,
      homework_file: this.props.item.homework_file,
      isDone: this.props.item.state === 'finish',
      isMark: this.props.item.state === 'mark', //是否评分
      item: this.props.item
    })
  }

  down() {
    this.props.downloadFile(this.state.homeworkID)
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{this.state.title}</Typography>
            </div>

            {this.state.state === 'mark' ? (
              <div className={classes.columnRight}>已打分</div>
            ) : this.state.state === 'finish' ? (
              <div className={classes.columnRight} style={{ color: '#43A047' }}>
                待评分
              </div>
            ) : (
              <div className={classes.columnRight} style={{ color: '#c00' }}>
                未完成
              </div>
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.row}>
              <div className={classes.content}>{this.state.content}</div>
              <div className={classes.bottom_right}>
                <Typography className={classes.thirdHeading}>截止日期：{this.state.deadline}</Typography>
                <Typography className={classes.thirdHeading}>学号: {this.state.receiver}</Typography>
              </div>
              <div className={classes.bottom_right}>得分：{this.state.grade === '' ? '未评分' : this.state.grade}</div>
              <div className={classes.bottom_right}>
                {this.state.isDone || this.state.isMark ? <Button onClick={() => this.down()}>下载</Button> : ''}
              </div>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" onClick={() => this.props.openDeleteDialog(this.state.item)} color="primary">
              删除
            </Button>
            <Button size="small" onClick={() => this.props.openEditDialog(this.state.item)} color="primary">
              修改
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    )
  }
}

HomeworkManageItem.propTypes = {
  downloadFile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  downloadFile: homeworkID => dispatch(downloadFiles(homeworkID)),
  failUploadMes: ms => dispatch(failUploadMes(ms))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomeworkManageItem))

//export default withStyles (styles) (HomeworkItem);
