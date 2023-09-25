import { IpcRendererEvent } from 'electron';

declare global {
  interface Window {
    myAPI: IMyAPI;
    historyAPI: HistoryAPI;
  }
}
export interface IMyAPI {
  sendMessage: (top: string, lower: string) => void;
  setShortcut: (shortcut1: string, shortcut2: string) => void;
  getShortcut: () => Promise<{ shortcut1?: string; shortcut2?: string }>;
  loadMessage: () => Promise<{ top: string; lower: string }>;
  openSettings: () => void;
  sendImage: (image: string) => void;
  onReceiveMessage: (listener: (message: string) => void) => () => void;
  addHistory: (top: string, lower: string) => void;
  getHistory: (
    listener: (
      message: {
        top: string;
        lower: string;
      }[],
    ) => void,
  ) => () => void;
  getHistoryOnce: () => Promise<{ top: string; lower: string }[]>;
}

export interface HistoryAPI {
  addHistory: (top: string, lower: string) => void;
  getHistory: (
    listener: (
      message: {
        top: string;
        lower: string;
      }[],
    ) => void,
  ) => () => void;
}
