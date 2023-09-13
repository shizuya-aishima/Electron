import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { IPCKeys } from './constants';

// const store = new Store();
contextBridge.exposeInMainWorld('myAPI', {
  // 関数で包んで部分的に公開する
  // renderer -> main
  sendMessage: (top: string, lower: string) => {
    ipcRenderer.send(IPCKeys.SEND_MESSSAGE, top, lower);
  },
  sendImage: (image: Blob) => {
    ipcRenderer.send(IPCKeys.SEND_IMAGE, image);
  },
  loadMessage: async (): Promise<{ top: string; lower: string }> => {
    return await ipcRenderer.invoke(IPCKeys.LOAD);
  },
  // main -> renderer
  onReceiveMessage: (listener: (message: string) => void) => {
    ipcRenderer.on(
      IPCKeys.RECEIVE_MESSAGE,
      (event: IpcRendererEvent, message: string) => {
        console.log('test aaa');
        listener(message);
      },
    );
    return () => {
      ipcRenderer.removeAllListeners(IPCKeys.RECEIVE_MESSAGE);
    };
  },
});
