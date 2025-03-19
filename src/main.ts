import { update } from "./update";
import { draw } from "./draw";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d")!;

const dt = 1 / 60; // time between frames in seconds
const w = 1920;
const h = 1080;

c.scale(canvas.width / w, canvas.height / h);

function game_loop() {
    update(dt, w, h);
    draw(c, w, h);
}

setInterval(game_loop, dt * 1000);
