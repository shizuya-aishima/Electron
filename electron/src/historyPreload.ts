import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { IPCKeys } from './constants';

// const store = new Store();
contextBridge.exposeInMainWorld('historyAPI', {
  // 関数で包んで部分的に公開する
  // renderer -> main
  addHistory: (top: string, lower: string) => {
    ipcRenderer.send(IPCKeys.ADD_HISTORY, top, lower);
  },
  // main -> renderer
  getHistory: (
    listener: (
      message: {
        top: string;
        lower: string;
      }[],
    ) => void,
  ) => {
    ipcRenderer.on(
      IPCKeys.GET_HISTORY,
      (
        event: IpcRendererEvent,
        message: {
          top: string;
          lower: string;
        }[],
      ) => {
        listener(message);
      },
    );
    return () => {
      ipcRenderer.removeAllListeners(IPCKeys.GET_HISTORY);
    };
  },
});
