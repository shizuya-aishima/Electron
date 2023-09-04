import path from "path";
import { BrowserWindow, Menu, Tray, app, nativeImage } from "electron";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
    'icon': __dirname + "/../assets/favicon.png",
  });

  mainWindow.loadFile("dist/index.html");
  mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(() => {
  createWindow();
  const img = nativeImage.createFromPath(__dirname + "/../assets/favicon.png")
  let tray = new Tray(img)
  tray.setToolTip('Tray app')
  
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Quit', role: 'quit' }
  ]))
});

app.once("window-all-closed", () => app.quit());
