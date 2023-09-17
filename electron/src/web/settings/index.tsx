import React from 'react';

export const Setting = () => {
  const { myAPI } = window;
  const [shortcut1, setShortcut1] = React.useState('');
  const [shortcut2, setShortcut2] = React.useState('');

  React.useEffect(() => {
    myAPI.getShortcut().then((data) => {
      console.log(data);
      setShortcut1(data.shortcut1 || '');
      setShortcut2(data.shortcut2 || '');
    });
  }, []);
  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-1 h-full bg-gray-400">
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
            onClick={() => {
              myAPI.setShortcut(shortcut1, shortcut2);
            }}
          >
            save
          </button>
        </div>
      </div>
    </>
  );
};
