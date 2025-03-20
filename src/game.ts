import { Input } from "./input";
import { update as update_overworld, draw as draw_overworld } from "./overworld";

// Different screens of the game
enum State {
    OVERWORLD
}

// Current screen of the game
let state = State.OVERWORLD;

/**
 * Advance the game 1 tick
 * @param inputs - Inputs made this tick
 * @param dt - Delta time in seconds
 */
export function update(inputs: Input, dt: number): void {
    switch (state) {
        case State.OVERWORLD:
            update_overworld(inputs, dt);
            break;
    }
}

/**
 * Draw the game
 * @param c - Canvas contex to draw on
 * @param w - Width of canvas
 * @param h - Height of canvas
 */
export function draw(c: CanvasRenderingContext2D, w: number, h: number) {
    switch (state) {
        case State.OVERWORLD:
            draw_overworld(c, w, h);
    }
}