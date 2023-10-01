import React from 'react';
import { Canvas } from '../seal/history';

export const Setting = () => {
  const { myAPI } = window;
  const [shortcut1, setShortcut1] = React.useState('');
  const [shortcut2, setShortcut2] = React.useState('');
  const [history, setHistory] = React.useState<
    { top: string; lower: string; shortcut1: string; shortcut2: string }[]
  >([]);
  React.useEffect(() => {
    // APIから現在のショートカットを取得する
    myAPI.getShortcut().then((data) => {
      console.log(data);
      setShortcut1(data.shortcut1 || '');
      setShortcut2(data.shortcut2 || '');
    });
    // スタンプ履歴を一度取得し、状態を更新します。
    myAPI.getHistoryOnce().then((data) => {
      console.log(data);
      setHistory(data);
    });

    // スタンプ履歴を更新するリスナーを登録します。
    const remove = myAPI.getHistory((data) => {
      console.log(data);
      setHistory(data);
    });

    // イフクションが破棄されるときにリスナーを解除します。
    return () => {
      remove();
    };
  }, [myAPI]);

  /**
   * 新しいショートカットをAPIに保存する
   */
  const saveShortcut = () => {
    myAPI.createHistory(history);
    myAPI.setShortcut(shortcut1, shortcut2, history);
  };

  const saveHistoryShortcut = () => {
    myAPI.createHistory(history);
    myAPI.setShortcut(shortcut1, shortcut2, history);
  };

  return (
    <>
      <div className="flex gap-2 mb-6 md:grid-cols-1 h-full bg-gray-400 flex-col">
        <div className="ml-2 mr-2 mt-2 gap-2 flex flex-col">
          <div>
            <label className="block mb-0 font-medium text-gray-900 dark:text-white text-lg">
              コピーショットカット設定
            </label>
          </div>
          <div className="flex flex-row items-center gap-1">
            <label
              htmlFor="top"
              className="block mb-0 text-sm font-medium text-gray-900 dark:text-white w-20"
            >
              キー
            </label>
            <label
              htmlFor="top"
              className="block mb-0 text-sm font-medium text-gray-900 dark:text-white w-8 bg-gray-50 dark:bg-gray-400 text-center"
            >
              Ctrl
            </label>
            <label className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">
              +
            </label>
            <input
              id="key2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={shortcut1}
              onChange={(e) => setShortcut1(e.target.value)}
            />
            <label className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">
              +
            </label>
            <input
              id="key2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={shortcut2}
              onChange={(e) => setShortcut2(e.target.value)}
            />
          </div>
          <button
            className="bg-gray-50 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={saveShortcut}
          >
            save
          </button>
        </div>
        <div className="p-2">
          {history.map((item, index) => {
            console.log(item);
            return (
              <div
                className="flex flex-row items-center gap-1"
                key={item.top + '-' + item.lower + 'div'}
              >
                <label
                  key={item.top + '-' + item.lower + 'key'}
                  className="block mb-0 text-sm font-medium text-gray-900 dark:text-white w-20"
                >
                  キー
                </label>
                <label
                  key={item.top + '-' + item.lower + 'ctrl'}
                  className="block mb-0 text-sm font-medium text-gray-900 dark:text-white w-8 bg-gray-50 dark:bg-gray-400 text-center"
                >
                  Ctrl
                </label>
                <label
                  key={item.top + '-' + item.lower + '+'}
                  className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
                >
                  +
                </label>
                <input
                  key={item.top + '-' + item.lower + 'shortcut1'}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={item.shortcut1}
                  onChange={(e) =>
                    setHistory((old) =>
                      old.map((ele, i) =>
                        i === index
                          ? { ...ele, shortcut1: e.target.value }
                          : ele,
                      ),
                    )
                  }
                />
                <label
                  key={item.top + '-' + item.lower + '+2'}
                  className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
                >
                  +
                </label>
                <input
                  key={item.top + '-' + item.lower + 'shortcut2'}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={item.shortcut2}
                  onChange={(e) =>
                    setHistory((old) =>
                      old.map((ele, i) =>
                        i === index
                          ? { ...ele, shortcut2: e.target.value }
                          : ele,
                      ),
                    )
                  }
                />
                <Canvas
                  key={item.top + '-' + item.lower + 'canvas'}
                  top={item.top}
                  lower={item.lower}
                  alpha={false}
                  onClick={() => false}
                />
              </div>
            );
          })}
          <button
            className="bg-gray-50 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={saveShortcut}
          >
            save
          </button>
        </div>
      </div>
    </>
  );
};
