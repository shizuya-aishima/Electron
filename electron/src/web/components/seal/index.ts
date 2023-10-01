/**
 * Canvasにテキストを書き込みます。
 */
export const canvasWrite = (
  ctx: CanvasRenderingContext2D,
  top: string,
  lower: string,
  date: Date,
  alpha: boolean,
) => {
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
