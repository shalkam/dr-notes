import { app, BrowserWindow, Menu, shell } from 'electron';
import Server from './server/server.js';
import path from 'path';

let menu;
let template;
let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('before-quit', () => {
  mainWindow.removeAllListeners('close');
  mainWindow.close();
});
app.on('ready', () => {
  Server.init();
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: path.join(__dirname, 'assets/dr-notes.png')
  });
  Server.on('server.loaded', port => {
    mainWindow.loadURL(`http://127.0.0.1:${port}`, { extraHeaders: 'pragma: no-cache\n' });
    mainWindow.webContents.send('loaded.server', port);
  });
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.send('app.started');
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
