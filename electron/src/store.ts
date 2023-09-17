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
  store.set('shortcut.shortcut1-1', shortcut1);
  store.set('shortcut.shortcut2-1', shortcut2 || '');
};

export const getShortcut = () => {
  return {
    shortcut1: store.get('shortcut.shortcut1-1') as string | undefined,
    shortcut2: store.get('shortcut.shortcut2-1') as string | undefined,
  };
};
