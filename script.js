const intro = document.getElementById("intro");
const garden = document.getElementById("garden");
const crown = document.getElementById("crown");
const message = document.getElementById("message");
const start = document.getElementById("start");

function heartXY(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  return { x, y };
}

function outlinePoints(count = 44) {
  const pts = [];

  for (let i = 0; i < count; i++) {
    const t = (Math.PI * 2 * i) / count;
    const p = heartXY(t);

    const nx = 50 + p.x * 1.65;
    const ny = 44 - p.y * 1.45;

    pts.push([nx, ny]);
  }

  return pts;
}

function insideHeart(x, y) {
  return (
    Math.pow(x * x + y * y - 1, 3) -
      x * x * Math.pow(y, 3) <=
    0
  );
}

function fillPoints(count = 80) {
  const pts = [];
  let tries = 0;

  while (pts.length < count && tries < count * 80) {
    tries++;

    const x = Math.random() * 2.1 - 1.05;
    const y = Math.random() * 1.95 - 1.15;

    if (insideHeart(x, y)) {
      const nx = 50 + x * 26;
      const ny = 47 - y * 20;

      if (nx > 15 && nx < 85 && ny > 12 && ny < 77) {
        pts.push([nx, ny]);
      }
    }
  }

  pts.sort((a, b) => a[1] - b[1]);

  return pts;
}

function addFlower(x, y, delay) {
  const f = document.createElement("span");

  f.className = "flower small";

  f.innerHTML =
    '<span class="petals"></span><span class="center"></span>';

  f.style.left = x + "%";
  f.style.top = y + "%";

  f.style.animation =
    `bloom .5s cubic-bezier(.2,.8,.2,1) ${delay}ms forwards`;

  crown.appendChild(f);
}

start.addEventListener("click", () => {
  intro.style.display = "none";

  garden.classList.remove("hidden");
  garden.setAttribute("aria-hidden", "false");

  crown.innerHTML = "";
  message.classList.remove("show");

  const outline = outlinePoints();
  const fill = fillPoints();

  let delay = 0;

  outline.forEach((p) => {
    addFlower(p[0], p[1], delay);
    delay += 45;
  });

  fill.forEach((p) => {
    addFlower(p[0], p[1], delay);
    delay += 28;
  });

  setTimeout(() => {
    message.classList.add("show");
  }, delay + 700);
});
