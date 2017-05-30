import React from 'react';
import electron from 'electron';
import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import ListIcon from 'material-ui/svg-icons/action/list';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

class Header extends React.Component {
  state = {
    showModal: false
  };
  handleMenu(event, value) {
    const electronWindow = electron.remote.getCurrentWindow();
    if (value === 'exit')
      electronWindow.close();
    else if (value === 'about')
      this.setState({ showModal: !this.state.showModal });
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
        <Dialog
          actions={[
            <RaisedButton
              label="OK"
              primary={true}
              onTouchTap={() => this.setState({ showModal: !this.state.showModal })}
            />
          ]}
          open={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: !this.state.showModal })}>
          <h3>Dr. Notes</h3>
          <p>Version 1.0.0</p>
          <p>By:</p>
          <List>
            <ListItem
              disabled={true}
              leftAvatar={<Avatar src="assets/images/1.jpg" size={40} style={{ margin: 5 }} />}>
              Mostafa Sholkamy: Building the software
            </ListItem>
            <ListItem
              disabled={true}
              leftAvatar={<Avatar src="assets/images/2.jpg" size={40} style={{ margin: 5 }} />}>
              Mohamed Ahmed: Coming up with the idea and testing
            </ListItem>
          </List>
        </Dialog>
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
              <MenuItem primaryText="About" value="about" />
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
            leftIcon={<ListIcon />}>
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
