import { draw as draw_dialog, update as update_dialog } from "./dialog";
import { Input } from "./input";
import { update as update_overworld, draw as draw_overworld } from "./overworld";

// Different state of the game
export enum State {
    OVERWORLD,
    DIALOG
};

// Current state of the game
let state = State.OVERWORLD;

/**
 * Change current game state
 * @param s - New state
 */
export function set_state(s: State) {
    state = s;
}

/**
 * Advance the game 1 tick
 * @param inputs - Inputs made this tick
 * @param dt - Delta time in seconds
 * @param w - Width of canvas
 * @param h - Hidth of canvas
 */
export function update(inputs: Input, dt: number, w: number, h: number): void {
    switch (state) {
        case State.OVERWORLD:
            update_overworld(inputs, dt, w, h);
            break;

        case State.DIALOG:
            update_dialog(inputs, dt, w, h);
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
            break;

        case State.DIALOG:
            draw_overworld(c, w, h);
            draw_dialog(c, w, h);
            break;
    }
}