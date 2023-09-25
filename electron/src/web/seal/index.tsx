import { Disclosure } from '@headlessui/react';
import React from 'react';
import StampHistory from './history';

const { myAPI } = window;
export const Seal = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const ref = React.useRef<HTMLDivElement>(null);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;

    return canvas.getContext('2d');
  };

  const [top, setTop] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [lower, setLower] = React.useState('');
  const [alpha, setAlpha] = React.useState(false);

  React.useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    // ctx.clearRect(0, 0, 150, 150);
    ctx.fillStyle = 'rgba(255,255,255,1)'; //青で不透明度0.3で塗り潰す
    ctx.fillRect(-50, -50, 150, 150); // 描画
    if (alpha) {
      // ctx.fillStyle = 'rgba(255,255,255,0)'; //青で不透明度0.3で塗り潰す
      // ctx.fillRect(-50, -50, 150, 150); // 描画
      ctx.beginPath();
      ctx.clearRect(0, 0, 150, 150);
    }
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(30, 30, 28, 0, Math.PI * 2, true); // 外の円
    ctx.font = "bold 14px 'メイリオ'";
    ctx.textAlign = 'center';
    ctx.fillText(top, 30, 20);
    ctx.fillText(lower, 30, 51);
    ctx.moveTo(58, 24);
    ctx.lineTo(2, 24);
    ctx.moveTo(58, 36);
    ctx.lineTo(2, 36);

    ctx.font = '10px serif';
    ctx.textAlign = 'center';
    ctx.fillText(date.toLocaleDateString(), 30, 33);
    ctx.stroke();
  }, [top, lower, date, alpha]);

  React.useEffect(() => {
    const test = async () => {
      const test = await myAPI.loadMessage();
      setTop(test.top);
      setLower(test.lower);
    };
    test();
  }, []);

  React.useEffect(() => {
    // イベントリスナーを追加
    const removeListener = myAPI.onReceiveMessage((message) => {
      console.log(message);
      myAPI.sendImage(getImage());
    });
    // コンポーネントのクリーンアップ処理でイベントリスナーを削除する
    return () => {
      removeListener();
    };
  }, []);

  const getImage = () => {
    return canvasRef.current?.toDataURL('image/png') || '';
  };

  const openSetting = () => {
    myAPI.openSettings();
  };

  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-1 ">
        <div className="ml-2 mr-2 mt-2 gap-2 flex flex-col">
          <div className="flex justify-end">
            <button
              type="button"
              className="text-white bg-slate-100 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={openSetting}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <label
              htmlFor="top"
              className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
            >
              上段
            </label>
            <input
              id="top"
              onChange={(value) => {
                setTop(value.currentTarget.value);
              }}
              value={top}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
            >
              日付
            </label>
            <input
              id="date"
              onChange={(value) => {
                setDate(new Date(Date.parse(value.target.value)));
              }}
              type="date"
              value={
                isNaN(date.getDate())
                  ? new Date().toISOString().slice(0, 10)
                  : date.toISOString().slice(0, 10)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="button"
              className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
            >
              下段
            </label>

            <input
              id="button"
              onChange={(value) => {
                setLower(value.currentTarget.value);
              }}
              value={lower}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              onClick={(e) => {
                setAlpha(!alpha);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              透明化
            </label>
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              myAPI.sendImage(getImage());
              myAPI.addHistory(top, lower);
            }}
          >
            copy
          </button>
          <button
            className="bg-gray-50 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-400 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-800"
            onClick={() => {
              myAPI.sendMessage(top, lower);
            }}
          >
            save
          </button>
          <div
            ref={ref}
            className="mx-auto items-center flex justify-center mb-4 bg-white p-2"
          >
            <canvas className="canvas" width="60" height="60" ref={canvasRef} />
          </div>
        </div>
        <Disclosure>
          {({ open }) => (
            /* Use the `open` state to conditionally change the direction of an icon. */
            <>
              <Disclosure.Button>
                <div className="flex flex-row items-center justify-center relative bg-gray-50 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-400 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-800">
                  history
                  {open ? (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white absolute right-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 8"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white absolute right-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 8"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
                      />
                    </svg>
                  )}
                </div>
                {/* <ChevronRightIcon className={open ? 'rotate-90 transform' : ''} /> */}
              </Disclosure.Button>
              <Disclosure.Panel>
                <StampHistory />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};
