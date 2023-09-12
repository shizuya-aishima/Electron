import {
  BrowserWindow,
  IpcRendererEvent,
  Menu,
  Notification,
  Tray,
  app,
  clipboard,
  globalShortcut,
  ipcMain,
  nativeImage,
} from 'electron';
import path from 'path';
import { IPCKeys } from './constants';
import Store from 'electron-store'; // electron-store利用

const showNotification = () => {
  new Notification({
    title: '印鑑',
    body: 'コピーしました',
  }).show();
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 420,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
    icon: __dirname + '/../assets/favicon.png',
  });

  mainWindow.loadFile('dist/index.html');
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  return mainWindow;
};

app.whenReady().then(() => {
  const win = createWindow();
  const img = nativeImage.createFromPath(__dirname + '/../assets/favicon.png');
  let tray = new Tray(img);
  tray.setToolTip('Tray app');

  tray.setContextMenu(
    Menu.buildFromTemplate([{ label: 'Quit', role: 'quit' }]),
  );
  reloadGlobalHotkeySettings(win);
});

const store = new Store();
ipcMain.on(IPCKeys.SEND_MESSSAGE, (event, top, lower) => {
  store.set('top', top);
  store.set('lower', lower);
});

ipcMain.on(IPCKeys.SEND_IMAGE, (event, image: string) => {
  const a = nativeImage.createFromDataURL(image);
  clipboard.writeImage(a);
  showNotification();
});
ipcMain.handle(IPCKeys.LOAD, (event) => {
  const top = store.get('top');
  const lower = store.get('lower');

  return { top, lower };
});
// app.once('window-all-closed', () => app.quit());

const reloadGlobalHotkeySettings = (win: BrowserWindow) => {
  globalShortcut.register('CommandOrControl+Shift+v', () => {
    win.webContents.send(IPCKeys.RECEIVE_MESSAGE, 'test message');
  });
};
