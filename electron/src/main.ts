import {
  BrowserWindow,
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
import { getShortcut, getStamp, saveStamp, setShortcut } from './store';

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

  mainWindow.loadURL(`file://${__dirname}/../dist/index.html#/`);
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.on('close', (event) => {
    mainWindow.hide();
    if (!isClose) {
      event.preventDefault();
    }
  });

  return mainWindow;
};

const createSubWindow = () => {
  const subWindow = new BrowserWindow({
    width: 420,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
    icon: __dirname + '/../assets/favicon.png',
  });

  subWindow.loadURL(`file://${__dirname}/../dist/index.html#/sub`);
  if (!app.isPackaged) {
    subWindow.webContents.openDevTools({ mode: 'detach' });
  }

  subWindow.on('close', (event) => {
    subWindow.hide();
    if (!isClose) {
      event.preventDefault();
    }
  });

  return subWindow;
};
// to handle quitting
const handleQuit = () => {
  isClose = true;
  if (process.platform !== 'darwin') {
    app.quit();
  }
};

app.whenReady().then(() => {
  /**
   * ショートカットキーの設定
   * @param win {BrowserWindow} ブラウザ
   * @param tmpShortcut1 {string} ショートカットキー1
   * @param tmpShortcut2 {string} ショートカットキー2
   */
  const reloadGlobalHotkeySettings = (
    win: BrowserWindow,
    tmpShortcut1?: string,
    tmpShortcut2?: string,
  ) => {
    const store = getShortcut();
    if (tmpShortcut1) {
      setShortcut(tmpShortcut1, tmpShortcut2);
    }
    const shortcut1 = tmpShortcut1 || store.shortcut1;
    const shortcut2 = tmpShortcut2 ?? store.shortcut2;
    globalShortcut.unregisterAll();
    globalShortcut.register(
      `CommandOrControl+${shortcut1 || 'b'}${shortcut2 ? '+' : ''}${shortcut2}`,
      () => {
        win.webContents.send(IPCKeys.RECEIVE_MESSAGE, 'test message');
      },
    );
  };

  /**
   * Stampの上段下段の保存
   */
  ipcMain.on(IPCKeys.SEND_MESSSAGE, (event, top, lower) => {
    saveStamp(top, lower);
  });

  /**
   * ショートカット画面を開く
   */
  ipcMain.on(IPCKeys.OPEN_SETTINGS, (event) => {
    createSubWindow();
  });

  /**
   * 画像をクリップボードに保存
   */
  ipcMain.on(IPCKeys.SEND_IMAGE, (event, image: string) => {
    clipboard.writeImage(nativeImage.createFromDataURL(image));
    showNotification();
  });

  /**
   * 設定画面の読み込み
   */
  ipcMain.handle(IPCKeys.GET_SHORTCUT, (event) => {
    return getShortcut();
  });

  /**
   * Stamp画面の読み込み
   */
  ipcMain.handle(IPCKeys.LOAD, (event) => {
    return getStamp();
  });

  const window = createWindow();
  ipcMain.on(
    IPCKeys.SET_SHORTCUT,
    (event, shortcut1: string, shortcut2: string) => {
      setShortcut(shortcut1, shortcut2);
      reloadGlobalHotkeySettings(window, shortcut1, shortcut2);
    },
  );

  const img = nativeImage.createFromPath(__dirname + '/../assets/favicon.png');
  let tray = new Tray(img);
  tray.setToolTip('Tray app');

  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Quit', type: 'normal', click: handleQuit },
    ]),
  );
  tray.addListener('click', () => window.show());
  reloadGlobalHotkeySettings(window);
});

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
