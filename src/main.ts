import { update } from "./update";
import { draw } from "./draw";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d")!;

const dt = 1 / 60; // time between frames in seconds
const w = 1920;
const h = 1080;

export enum Controls {
    UP = "w",
    DOWN = "s",
    LEFT = "a",
    RIGHT = "d",

    DEBUG = "Enter"
}

const inputs = new Set<string>();

c.scale(canvas.width / w, canvas.height / h);

function game_loop() {
    update(inputs, dt, w, h);
    draw(c, w, h);
}

document.addEventListener("keydown", e => inputs.add(e.key));
document.addEventListener("keyup", e => inputs.delete(e.key));

setInterval(game_loop, dt * 1000);
