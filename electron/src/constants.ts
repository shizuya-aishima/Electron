// チャンネルを定数で管理する
export const IPCKeys = {
  RECEIVE_MESSAGE: 'receiveMessage',
  SEND_MESSSAGE: 'sendMessage',
  SET_SHORTCUT: 'setShortcut',
  GET_SHORTCUT: 'getShortcut',
  OPEN_SETTINGS: 'openSettings',
  LOAD: 'load',
  SEND_IMAGE: 'send_image',
  GET_HISTORY: 'getHistory',
  GET_HISTORY_ONCE: 'getHistoryOnce',
  ADD_HISTORY: 'addHistory',
  DELETE_HISTORY: 'deleteHistory',
  CREATE_HISTORY: 'createHistory',
} as const;
