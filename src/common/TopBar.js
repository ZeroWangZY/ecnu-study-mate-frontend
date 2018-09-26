import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux'
import { setDrawer, logoutAction } from '../redux/actions/app'
import { Button } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class TopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.props.showDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              学涯通
            </Typography>
            {
              this.props.app.isLoginned ? 
              <Button style={{color: '#FFFFFF'}} onClick={this.props.logout}>
              注销
              </Button> :
              null
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = dispatch => ({
  showDrawer: () => dispatch(setDrawer(true)),
  logout: () => dispatch(logoutAction)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TopBar));