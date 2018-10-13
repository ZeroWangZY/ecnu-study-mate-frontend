import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { setDrawer } from '../redux/actions/app';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import { Link } from 'react-router-dom';
const styles = {
  list: {
    width: 300,
  },
};

class Leftmenu extends Component {
  render() {
    const { classes, app } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <div>
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={app.role === 'ROLE_ADVISOR' ? app.studentInfo.studentId + '的日程' : '日程'} />
              </ListItem>
            </Link>
            <Link to="/homework">
              <ListItem button>
                  <ListItemIcon>
                      <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="作业" />
              </ListItem>
          </Link>
              <Link to="/homeworkManage">
                  <ListItem button>
                      <ListItemIcon>
                          <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="作业管理" />
                  </ListItem>
              </Link>
            <ListItem button>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="学习计划" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="学习资料" />
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>
          <div>
            <ListItem button>
              <ListItemIcon>
                <ReportIcon />
              </ListItemIcon>
              <ListItemText primary="性格和就业测试" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="成绩分析" />
            </ListItem>
            <Link to="/message">
              <ListItem button>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="消息" />
              </ListItem>
            </Link>
          </div>
        </List>
      </div>
    );

    return (
      <div>
        <Drawer
          open={this.props.app.shouldShowDrawer}
          onClose={this.props.hideDrawer}
        >
          <div tabIndex={0} role="button" onKeyDown={this.props.hideDrawer}>
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Leftmenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  hideDrawer: () => dispatch(setDrawer(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Leftmenu)
);
