const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawHex(x, y, size) {
  const a = (Math.PI * 2) / 6;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.lineTo(x + size * Math.cos(a * i), y + size * Math.sin(a * i));
  }
  ctx.closePath();
  ctx.stroke();
}

for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    const x = col * 90 + (row % 2) * 45;
    const y = row * 78;
    drawHex(x + 50, y + 50, 40);
  }
}