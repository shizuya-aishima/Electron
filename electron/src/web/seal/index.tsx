import React from "react";
export const Seal = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

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
    ctx.fillText("相島", 75, 40);
    ctx.fillText("相島", 75, 120);
    ctx.moveTo(150, 65);
    ctx.lineTo(0, 65);
    ctx.moveTo(150, 85);
    ctx.lineTo(0, 85);

    ctx.font = "12px serif";
    ctx.textAlign = "center"
    ctx.fillText(new Date().toLocaleDateString(), 75, 80);
    ctx.stroke();
  })

  return (
    <div className="top-4">
      <button onClick={() => {
        console.log("e")
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
          if (Notification.permission === "granted") {
            // 通知権限が既に付与されているかどうかを調べる。
            // そうであれば、通知を作成
            const notification = new Notification("コピーしました");

          } else if (Notification.permission !== "denied") {
            // ユーザーにその権限を要求する必要がある
            Notification.requestPermission().then((permission) => {
              // ユーザーが許可したら、通知を作成
              if (permission === "granted") {
                const notification = new Notification("コピーしました");
                // …
              }
            });
          }
        }).catch(e => {
          alert(e)
          console.log(e)
        });
      }}>copy</button>

      <div>
        <canvas className="canvas" width="150" height="150" ref={canvasRef} />
      </div>
    </div>
  );
}