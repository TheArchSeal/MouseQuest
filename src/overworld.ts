import { create_entity, entities, Entity } from "./entity";
import { Controls, Input } from "./input";
import { player } from "./player";
import { is_zero, Vector } from "./vector";

/**
 * Advance the overworld 1 tick
 * @param inputs - Inputs made this tick
 * @param dt - Delta time in seconds
 */
export function update(inputs: Input, dt: number): void {
    var velocity = Vector.ZERO.clone();

    if (inputs.held.has(Controls.UP)) velocity.sub(Vector.UNIT_Y);
    if (inputs.held.has(Controls.DOWN)) velocity.add(Vector.UNIT_Y);
    if (inputs.held.has(Controls.LEFT)) velocity.sub(Vector.UNIT_X);
    if (inputs.held.has(Controls.RIGHT)) velocity.add(Vector.UNIT_X);

    if (inputs.pressed.has(Controls.DEBUG)) {
        create_entity(player.pos, 50, 50, "blue")
    }

    if (!is_zero(velocity)) {
        player.move_by(velocity.normalize().scale(player.speed * dt));
    }
}

// Draw one entity to the canvas
function draw_entity(c: CanvasRenderingContext2D, e: Entity): void {
    if (!(e.src instanceof HTMLImageElement)) {
        c.fillStyle = e.src;
        c.fillRect(e.pos.x, e.pos.y - e.h, e.w, e.h);
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
