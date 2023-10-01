import Store from 'electron-store'; // electron-store利用

const store = new Store();

export const saveStamp = (top: string, lower: string) => {
  store.set('top', top);
  store.set('lower', lower);
};

export const getStamp = () => {
  return {
    top: store.get('top') || '',
    lower: store.get('lower') || '',
  };
};

export const setShortcut = (shortcut1: string, shortcut2?: string) => {
  store.set('shortcut.shortcut1-1', shortcut1 || 'b');
  store.set('shortcut.shortcut2-1', shortcut2 || '');
};

export const getShortcut = () => {
  return {
    shortcut1: store.get('shortcut.shortcut1-1') as string | undefined,
    shortcut2: store.get('shortcut.shortcut2-1') as string | undefined,
  };
};

export const addHistory = (
  top: string,
  lower: string,
  shortcut1?: string,
  shortcut2?: string,
) => {
  const backHistory = getHistory();
  if (
    backHistory.some(
      (data) => JSON.stringify(data) === JSON.stringify({ top, lower }),
    )
  )
    return;
  store.set(
    'history',
    backHistory.concat([
      { top, lower, shortcut1: shortcut1 || '', shortcut2: shortcut2 || '' },
    ]),
  );
};

export const getHistory = () => {
  const backHistory = store.get('history') as
    | { top: string; lower: string; shortcut1: string; shortcut2: string }[]
    | undefined;
  return backHistory || [];
};

export const deleteHistory = (index: number) => {
  const backHistory = getHistory();
  store.set(
    'history',
    backHistory.filter((_history, i) => i !== index),
  );
};

export const createHistory = (
  history: {
    top: string;
    lower: string;
    shortcut1: string;
    shortcut2: string;
  }[],
) => {
  store.set('history', history);
};
