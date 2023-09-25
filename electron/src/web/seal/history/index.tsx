import React from 'react';

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
const Canvas = (props: CanvasProps) => {
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
    ctx.fillStyle = 'rgba(255,255,255,1)'; //青で不透明度0.3で塗り潰す
    ctx.fillRect(-50, -50, 150, 150); // 描画
    if (alpha) {
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
  return (
    <div
      className="mx-auto items-center flex justify-center mb-4 bg-white p-2"
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

  return (
    <div className="mt-2 gap-2 flex flex-row bg-gray-400 flex-wrap">
      {state.map(({ top, lower }, i) => (
        <Canvas
          alpha={alpha}
          key={i + top + lower}
          top={top}
          lower={lower}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default StampHistory;
