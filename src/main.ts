import { draw, update } from "./game";
import { inputs } from "./input";
import { difference, Vector } from "./vector";

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
    update(inputs, dt, w, h);
    draw(c, w, h);
}

// handle player input
document.addEventListener("keydown", e => inputs.keydown(e.key));
document.addEventListener("keyup", e => inputs.keyup(e.key));
canvas.addEventListener("mousedown", e => {
    switch (e.button) {
        case 0: // primary click
            inputs.keydown("lmb");
            break;
        case 1: // auxilary click
            inputs.keydown("mmb");
            break;
        case 2: // secondary click
            inputs.keydown("rmb");
            break;
    }
    e.preventDefault();
});
canvas.addEventListener("mouseup", e => {
    switch (e.button) {
        case 0: // primary click
            inputs.keyup("lmb");
            break;
        case 1: // auxilary click
            inputs.keyup("mmb");
            break;
        case 2: // secondary click
            inputs.keyup("rmb");
            break;
    }
    e.preventDefault();
});
canvas.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect()
    const pos = new Vector(
        (e.x - rect.x) * w / rect.width,
        (e.y - rect.y) * h / rect.height
    );
    inputs.mouse_move(pos);
});

// start update loop
setInterval(game_loop, dt * 1000);
