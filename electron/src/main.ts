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

let isClose = false;

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
  // if (!app.isPackaged) {
  //   mainWindow.webContents.openDevTools({ mode: 'detach' });
  // }

  mainWindow.on('close', (event) => {
    mainWindow.hide();
    if (!isClose) {
      event.preventDefault();
    }
  });

  return mainWindow;
};
// to handle quitting
const handleQuit = () => {
  isClose = true;
  if (process.platform !== 'darwin') {
    app.quit();
  }
};

app.whenReady().then(() => {
  const mainWindow = createWindow();
  const img = nativeImage.createFromPath(__dirname + '/../assets/favicon.png');
  let tray = new Tray(img);
  tray.setToolTip('Tray app');

  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Quit', type: 'normal', click: handleQuit },
    ]),
  );
  tray.addListener('click', () => mainWindow.show());
  reloadGlobalHotkeySettings(mainWindow);
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

const reloadGlobalHotkeySettings = (win: BrowserWindow) => {
  globalShortcut.register('CommandOrControl+b', () => {
    win.webContents.send(IPCKeys.RECEIVE_MESSAGE, 'test message');
  });
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', (e: Event) => {});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
