import React, {Component} from 'react';
import TopBar from './common/TopBar';
import Dnd from './common/dnd';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import {mailFolderListItems, otherMailFolderListItems} from './common/MenuItem';
import {connect} from 'react-redux';
import {setDrawer} from './redux/actions';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  list: {
    width: 250,
  },
};

class App extends Component {
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
      <div className="App">
        <TopBar />
        <Dnd />
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
const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  hideDrawer: () => dispatch (setDrawer (false)),
});

export default connect (mapStateToProps, mapDispatchToProps) (
  withStyles (styles) (App)
);
