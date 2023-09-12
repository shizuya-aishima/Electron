import React from "react";


const { myAPI } = window;
export const Seal = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const ref = React.useRef<HTMLDivElement>(null);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;

    return canvas.getContext('2d');
  };

  React.useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.arc(75, 75, 75, 0, Math.PI * 2, true); // 外の円
    // ctx.arc(100, 100, 50, 0 * Math.PI / 180, 360 * Math.PI / 180, false)
    // ctx.moveTo(110, 75);
    ctx.font = "24px serif";
    ctx.textAlign = "center"
    ctx.clearRect(0, 0, 150, 150);
    ctx.fillText(top, 75, 40);
    ctx.fillText(lower, 75, 120);
    ctx.moveTo(150, 65);
    ctx.lineTo(0, 65);
    ctx.moveTo(150, 85);
    ctx.lineTo(0, 85);

    ctx.font = "12px serif";
    ctx.textAlign = "center"
    ctx.fillText(date.toLocaleDateString(), 75, 80);
    ctx.stroke();
  })

  const [top, setTop] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [lower, setLower] = React.useState("");

  React.useEffect(() => {
    const test = async () => {
      const test = await myAPI.loadMessage()
      setTop(test.top)
      setLower(test.lower)
    }
    test()
  }, [])

  React.useEffect(() => {
    // イベントリスナーを追加
    const removeListener = myAPI.onReceiveMessage(
      (message) => {
        myAPI.sendImage(getImage())
      },
    );
    // コンポーネントのクリーンアップ処理でイベントリスナーを削除する
    return () => {
      removeListener();
    };
  }, []);

  const getImage = () => {
    return (canvasRef.current?.toDataURL("image/png") || "")
  }

  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-1 h-full bg-gray-400">
        <div className="ml-2 mr-2 mt-2 gap-4 flex flex-col">
          <div>
            <label htmlFor="top" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">上段</label>
            <input
              id="top"
              onChange={(value) => {
                setTop(value.currentTarget.value)
              }}
              value={top}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">日付</label>
            <input
              id="date"
              onChange={(value) => {
                setDate(new Date(Date.parse(value.target.value)))
              }}
              type="date"
              value={isNaN(date.getDate()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="button" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">下段</label>

            <input
              id="button"
              onChange={(value) => {
                setLower(value.currentTarget.value)
              }}
              value={lower}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              myAPI.sendImage(getImage())
            }}>copy</button>
          <button
            className="bg-gray-50 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={() => {
              myAPI.sendMessage(top, lower);
            }}>save</button>
          <div ref={ref} className="mx-auto items-center flex justify-center mb-4 bg-white p-2">
            <canvas className="canvas" width="150" height="150" ref={canvasRef} />
          </div>
        </div>
      </div>
    </>

  );
}
