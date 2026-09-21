const intro = document.getElementById("intro");
const garden = document.getElementById("garden");
const crown = document.getElementById("crown");
const message = document.getElementById("message");
const start = document.getElementById("start");

function insideHeart(x, y) {
  return (
    Math.pow(x * x + y * y - 1, 3) -
    x * x * Math.pow(y, 3) <= 0
  );
}

function createHeart() {
  const points = [];
  const step = 0.17;
  let row = 0;

  for (let y = -1.15; y <= 1.15; y += step) {
    const offset = row % 2 === 0 ? 0 : step / 2;

    for (
      let x = -1.25 + offset;
      x <= 1.25;
      x += step
    ) {
      if (insideHeart(x, y)) {
        points.push([
          50 + x * 38,
          55 - y * 40
        ]);
      }
    }

    row++;
  }

  // Hace crecer el corazón desde abajo hacia arriba
  points.sort((a, b) => b[1] - a[1]);

  return points;
}

function addFlower(x, y, delay) {
  const flower = document.createElement("span");

  flower.className = "flower small";

  flower.innerHTML =
    '<span class="petals"></span>' +
    '<span class="center"></span>';

  flower.style.left = x + "%";
  flower.style.top = y + "%";

  flower.style.animation =
    `bloom .5s cubic-bezier(.2,.8,.2,1) ${delay}ms forwards`;

  crown.appendChild(flower);
}

start.addEventListener("click", () => {
  intro.style.display = "none";

  garden.classList.remove("hidden");
  garden.setAttribute("aria-hidden", "false");

  crown.innerHTML = "";
  message.classList.remove("show");

  const points = createHeart();

  points.forEach((point, index) => {
    addFlower(
      point[0],
      point[1],
      index * 18
    );
  });

  setTimeout(() => {
    message.classList.add("show");
  }, points.length * 18 + 700);
});
