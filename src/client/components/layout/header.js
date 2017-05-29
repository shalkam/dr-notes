import React from 'react';
import electron from 'electron';
import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import List from 'material-ui/svg-icons/action/list';
import MenuItem from 'material-ui/MenuItem';

class Header extends React.Component {
  handleMenu(event, value) {
    const electronWindow = electron.remote.getCurrentWindow();
    if (value === 'exit')
      electronWindow.close();
    else if (value === 'min')
      electronWindow.minimize();
    else if (value === 'max') {
      if (!electronWindow.isMaximized()) {
        electronWindow.maximize();
      } else {
        electronWindow.unmaximize();
      }
    }
  }
  render() {
    return (
      <div className="noPrint">
        <AppBar
          title={
            <div style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/')}>
              Dr. Notes
            </div>
          }
          onLeftIconButtonTouchTap={this.props.onDrawerChange}
          iconElementRight={
            <IconMenu
              onChange={this.handleMenu.bind(this)}
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
              <MenuItem primaryText="Minimize" value="min" />
              <MenuItem primaryText="Maximize" value="max" />
              <MenuItem primaryText="Exit" value="exit" />
            </IconMenu>
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.props.openNav}
          onRequestChange={this.props.onDrawerChange}>
          <MenuItem
            onTouchTap={() => {
              this.props.onDrawerChange();
              this.props.history.push('/');
            }}
            leftIcon={<List />}>
            Notes List
          </MenuItem>
          <MenuItem
            onTouchTap={() => {
              this.props.onDrawerChange();
              this.props.history.push('/note/create');
            }}
            leftIcon={<NoteAdd />}>
            New note
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
export default withRouter(Header);
