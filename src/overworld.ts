import { Dialog, start_dialog } from "./dialog";
import { create_entity, entities, Entity } from "./entity";
import { Controls, Input } from "./input";
import { player } from "./player";
import { is_zero, Vector } from "./vector";

/**
 * Advance the overworld 1 tick
 * @param inputs - Inputs made this tick
 * @param dt - Delta time in seconds
 * @param w - Width of canvas
 * @param h - Hidth of canvas
 */
export function update(inputs: Input, dt: number, w: number, h: number): void {
    var velocity = Vector.ZERO.clone();

    // movement
    if (inputs.held.has(Controls.UP)) velocity.sub(Vector.UNIT_Y);
    if (inputs.held.has(Controls.DOWN)) velocity.add(Vector.UNIT_Y);
    if (inputs.held.has(Controls.LEFT)) velocity.sub(Vector.UNIT_X);
    if (inputs.held.has(Controls.RIGHT)) velocity.add(Vector.UNIT_X);

    // don't move faster diagonally
    if (!is_zero(velocity)) {
        player.move_by(velocity.normalize().scale(player.speed * dt));
    }

    // debug
    if (inputs.pressed.has(Controls.LMB)) {
        create_entity(inputs.mouse_pos.clone(), new Vector(50, 50), "blue")
    }
    if (inputs.released.has(Controls.RMB)) {
        create_entity(inputs.mouse_pos.clone(), new Vector(200, 200), "green");
    }
    if (inputs.pressed.has(Controls.DEBUG)) {
        start_dialog(new Dialog(
            ["test 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nPellentesque convallis augue pellentesque ex posuere varius.\nMauris hendrerit scelerisque vehicula. Proin suscipit pellentesque magna, sit amet efficitur neque laoreet vitae. Praesent ac cursus sapien, ut lobortis lacus.", "test 2", "test 3"],
            []
        ), w, h);
    }
}

// Draw one entity to the canvas
function draw_entity(c: CanvasRenderingContext2D, e: Entity): void {
    if (!(e.src instanceof HTMLImageElement)) {
        c.fillStyle = e.src;
        c.fillRect(e.pos.x, e.pos.y - e.size.y, e.size.x, e.size.y);
    }
}

/**
 * Draw the overworld
 * @param c - Canvas contex to draw on
 * @param w - Width of canvas
 * @param h - Height of canvas
 */
export function draw(c: CanvasRenderingContext2D, w: number, h: number): void {
    c.clearRect(0, 0, w, h);
    for (const e of entities) {
        draw_entity(c, e);
    }
}
