import { IpcRendererEvent } from 'electron';

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
export interface IMyAPI {
  sendMessage: (top: string, lower: string) => void;
  loadMessage: () => Promise<{ top: string; lower: string }>;
  sendImage: (image: string) => void;
  onReceiveMessage: (listener: (message: string) => void) => () => void;
}
