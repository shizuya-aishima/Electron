import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { IPCKeys } from './constants';

type History = {
  top: string;
  lower: string;
  shortcut1?: string;
  shortcut2?: string;
};

// const store = new Store();
contextBridge.exposeInMainWorld('myAPI', {
  // 関数で包んで部分的に公開する
  // renderer -> main
  sendMessage: (top: string, lower: string) => {
    ipcRenderer.send(IPCKeys.SEND_MESSSAGE, top, lower);
  },
  openSettings: () => {
    ipcRenderer.send(IPCKeys.OPEN_SETTINGS);
  },
  setShortcut: (shortcut1: string, shortcut2: string, history: History) => {
    ipcRenderer.send(IPCKeys.SET_SHORTCUT, shortcut1, shortcut2, history);
  },
  getShortcut: async () => {
    return await ipcRenderer.invoke(IPCKeys.GET_SHORTCUT);
  },
  sendImage: (image: Blob) => {
    ipcRenderer.send(IPCKeys.SEND_IMAGE, image);
  },
  loadMessage: async (): Promise<{ top: string; lower: string }> => {
    return await ipcRenderer.invoke(IPCKeys.LOAD);
  },
  // main -> renderer
  onReceiveMessage: (listener: (message: History | undefined) => void) => {
    ipcRenderer.on(
      IPCKeys.RECEIVE_MESSAGE,
      (event: IpcRendererEvent, message: History | undefined) => {
        console.log(message);
        listener(message);
      },
    );
    return () => {
      ipcRenderer.removeAllListeners(IPCKeys.RECEIVE_MESSAGE);
    };
  },

  // history
  // 関数で包んで部分的に公開する
  // renderer -> main
  addHistory: (
    top: string,
    lower: string,
    shortcut1?: string,
    shortcut2?: string,
  ) => {
    ipcRenderer.send(IPCKeys.ADD_HISTORY, top, lower, shortcut1, shortcut2);
  },

  // 履歴の削除
  deleteHistory: (index: number) => {
    ipcRenderer.send(IPCKeys.DELETE_HISTORY, index);
  },
  // 履歴の洗い替え
  createHistory: (data: History[]) => {
    ipcRenderer.send(IPCKeys.CREATE_HISTORY, data);
  },
  // main -> renderer
  // getHistory: async (): Promise<{ top: string; lower: string }[]> => {
  //   return await ipcRenderer.invoke(IPCKeys.GET_HISTORY);
  // },
  getHistory: (listener: (message: History[]) => void) => {
    ipcRenderer.on(
      IPCKeys.GET_HISTORY,
      (event: IpcRendererEvent, message: History[]) => {
        console.log('test');
        listener(message);
      },
    );
    return () => {
      ipcRenderer.removeAllListeners(IPCKeys.GET_HISTORY);
    };
  },
  getHistoryOnce: async (): Promise<History[]> => {
    return await ipcRenderer.invoke(IPCKeys.GET_HISTORY_ONCE);
  },
});
