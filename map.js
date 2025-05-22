const mapData = [];
const VISION_RADIUS = 3;
const WIDTH = 80;
const HEIGHT = 120;

for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    mapData.push({ x, y, type: "empty", visible: false, discovered: false });
  }
}

const homeworld = { x: 5, y: 5 };
mapData.find(h => h.x === homeworld.x && h.y === homeworld.y).type = "homeworld";

mapData.forEach(hex => {
  const dx = hex.x - homeworld.x;
  const dy = hex.y - homeworld.y;
  const dz = -dx - dy;
  const dist = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));
  if (dist <= VISION_RADIUS) {
    hex.visible = true;
    hex.discovered = true;
  }
}

for (let i = 0; i < 100; i++) {
  const x = Math.floor(Math.random() * WIDTH);
  const y = Math.floor(Math.random() * HEIGHT);
  const hex = mapData.find(h => h.x === x && h.y === y);
  if (hex && hex.type === "empty") {
    hex.type = "asteroid";
  }
}
