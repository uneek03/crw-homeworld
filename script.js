const canvas = document.getElementById("hexMap");
const ctx = canvas.getContext("2d");
const viewMode = document.getElementById("viewMode");
const hoverInfo = document.getElementById("hoverInfo");

const HEX_WIDTH = 80;
const HEX_HEIGHT = 120;
const HEX_SIZE = 10;
canvas.width = HEX_WIDTH * HEX_SIZE * 0.866 + HEX_SIZE;
canvas.height = HEX_HEIGHT * HEX_SIZE * 0.75 + HEX_SIZE;

function hexDistance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = -a.x - a.y + b.x + b.y;
  return Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));
}

function drawHex(x, y, color) {
  const size = HEX_SIZE;
  const xOffset = size * 0.866;
  const yOffset = size * 0.75;
  const cx = x * xOffset + (y % 2 === 1 ? xOffset / 2 : 0) + size;
  const cy = y * yOffset + size;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const px = cx + size * Math.cos(angle);
    const py = cy + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  return { x: cx, y: cy };
}

function getColor(hex, isAdmin) {
  if (!hex.discovered && !isAdmin) return "#222";
  if (!hex.visible && !isAdmin) return "#444";
  if (hex.type === "homeworld") return "#f00";
  if (hex.type === "asteroid") return "#0af";
  return "#2a2";
}

function renderMap(mode) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mapData.forEach(hex => {
    const color = getColor(hex, mode === "admin");
    drawHex(hex.x, hex.y, color);
  });
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const size = HEX_SIZE;
  const xOffset = size * 0.866;
  const yOffset = size * 0.75;

  let hoveredHex = null;
  mapData.forEach(hex => {
    const cx = hex.x * xOffset + (hex.y % 2 === 1 ? xOffset / 2 : 0) + size;
    const cy = hex.y * yOffset + size;
    const dx = mx - cx;
    const dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < HEX_SIZE * 0.95) hoveredHex = hex;
  });

  if (hoveredHex) {
    hoverInfo.textContent = `Hex (${hoveredHex.x}, ${hoveredHex.y}) — ${hoveredHex.type}`;
  } else {
    hoverInfo.textContent = "Hover over a hex...";
  }
});

viewMode.addEventListener("change", () => {
  renderMap(viewMode.value);
});

document.addEventListener("DOMContentLoaded", () => {
  renderMap("admin");
});
