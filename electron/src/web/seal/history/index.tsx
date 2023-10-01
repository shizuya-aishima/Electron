import React from 'react';
import { canvasWrite } from '../../components/seal';

const { myAPI } = window;
type CanvasProps = {
  top: string;
  lower: string;
  alpha: boolean;
  onClick: (top: string, lower: string) => void;
};

/**
 * 円の中にテキストを描画するCanvasを表示するコンポーネントです。
 * コンポーネントをクリックすると、CanvasをBase64エンコードされたイメージとしてバックエンドに送信します。
 */
export const Canvas = (props: CanvasProps) => {
  const { top, lower, alpha, onClick } = props;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [date] = React.useState(new Date());

  /**
   * Canvas要素の2Dレンダリングコンテキストを返します。
   */
  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };

  /**
   * Canvasにテキストを書き込みます。
   */
  const write = (top: string, lower: string) => {
    const ctx = getContext();
    canvasWrite(ctx, top, lower, date, alpha);
  };

  React.useEffect(() => {
    write(top, lower);
  }, [top, lower]);

  /**
   * CanvasのイメージをBase64エンコードして返します。
   */
  const getImage = () => {
    return canvasRef.current?.toDataURL('image/png') || '';
  };

  /**
   * バックエンドにイメージを送信します。
   */
  const onClickHandler = () => {
    myAPI.sendImage(getImage());
    onClick(top, lower);
  };

  React.useEffect(() => {
    // イベントリスナーを追加
    const removeListener = myAPI.onReceiveMessage((message) => {
      console.log(message);
      if (message && message.top === top && message.lower === lower) {
        console.log(getImage());
        myAPI.sendImage(getImage());
      }
    });
    // コンポーネントのクリーンアップ処理でイベントリスナーを削除する
    return () => {
      removeListener();
    };
  }, []);
  return (
    <div
      className="mx-auto items-center flex justify-center bg-white p-2 my-1"
      onClick={onClickHandler}
    >
      <canvas className="canvas" width="60" height="60" ref={canvasRef} />
    </div>
  );
};

type StampHistoryProps = {
  onClick: (top: string, lower: string) => void;
  alpha: boolean;
};
/**
 * スタンプ履歴を表示するコンポーネントです。
 */
const StampHistory = (props: StampHistoryProps) => {
  const { onClick, alpha } = props;
  const [state, setState] = React.useState<{ top: string; lower: string }[]>(
    [],
  );

  React.useEffect(() => {
    // スタンプ履歴を一度取得し、状態を更新します。
    myAPI.getHistoryOnce().then((data) => {
      setState(data);
    });

    // スタンプ履歴を更新するリスナーを登録します。
    const remove = myAPI.getHistory((data) => {
      setState(data);
    });

    // イフクションが破棄されるときにリスナーを解除します。
    return () => {
      remove();
    };
  }, [myAPI]);

  const deleteButton = (index: number) => {
    myAPI.deleteHistory(index);
  };

  return (
    <div className="mt-2 gap-2 flex flex-row bg-gray-400 flex-wrap">
      {state.map(({ top, lower }, i) => (
        <div className="flex flex-col items-center flex-auto">
          <Canvas
            alpha={alpha}
            key={i + top + lower}
            top={top}
            lower={lower}
            onClick={onClick}
          />
          <button
            type="button"
            className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
            onClick={() => deleteButton(i)}
          >
            <svg
              className="w-[8px] h-[8px] text-red-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default StampHistory;
