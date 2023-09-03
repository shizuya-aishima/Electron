import React from "react";
import "./Test.scss"

export const Seal = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;

    return canvas.getContext('2d');
  };

  React.useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    ctx.beginPath();
    ctx.arc(75, 75, 75, 0, Math.PI * 2, true); // 外の円
    // ctx.moveTo(110, 75);
    ctx.font = "24px serif";
    ctx.textAlign = "center"
    ctx.clearRect(0, 0, 150, 150);
    ctx.fillText("相島", 75, 40);
    ctx.fillText("相島", 75, 120);
    ctx.moveTo(150, 65);
    ctx.lineTo(0, 65);
    ctx.moveTo(150, 85);
    ctx.lineTo(0, 85);

    ctx.font = "12px serif";
    ctx.textAlign = "center"
    ctx.fillText("2023/09/04", 75, 80);
    ctx.stroke();
  })

  return (
    <div className="top-4">
      <button onClick={() => {
        const canvas = getContext();
        const png = (canvasRef.current?.toDataURL("image/png") || "").replace(/^.*,/, '')
        //. バイナリ変換
        const bin = atob(png);
        let buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i);
        }
        const blob = new Blob([buffer], { type: 'image/png' }); //. イメージ
        navigator.clipboard.writeText("test")
        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]).then(() => {
        }).catch(e => {
          alert(e)
          console.log(e)
        });
      }}>copy</button>
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
}