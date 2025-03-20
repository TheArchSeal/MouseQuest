import { draw, update } from "./game";
import { inputs } from "./input";

// canvas element
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// canvas context
const c = canvas.getContext("2d")!;

// time between frames in seconds
const dt = 1 / 60;
// virtual with of canvas
const w = 1920;
// virtual hieght of canvas
const h = 1080;

// scale context to match virtual size
c.scale(canvas.width / w, canvas.height / h);

// main update loop
function game_loop() {
    inputs.update();
    update(inputs, dt);
    draw(c, w, h);
}

// handle player input
document.addEventListener("keydown", e => inputs.keydown(e.key));
document.addEventListener("keyup", e => inputs.keyup(e.key));

// start update loop
setInterval(game_loop, dt * 1000);
