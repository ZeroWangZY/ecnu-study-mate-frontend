import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {mailFolderListItems, otherMailFolderListItems} from './MenuItem';
import {connect} from 'react-redux';
import {setDrawer} from '../redux/actions/app';

const styles = {
  list: {
    width: 250,
  },
};

class Leftmenu extends Component {
  render () {
    const {classes} = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
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
  hideDrawer: () => dispatch (setDrawer (false)),
});

export default connect (mapStateToProps, mapDispatchToProps) (
  withStyles (styles) (Leftmenu)
);
