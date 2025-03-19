import { entities, Entity } from "./entity";
import { player } from "./player";

function draw_entity(c: CanvasRenderingContext2D, e: Entity): void {
    if (!(e.src instanceof HTMLImageElement)) {
        c.fillStyle = e.src;
        c.fillRect(e.pos.x, e.pos.y - e.h, e.w, e.h);
    }
}

export function draw(c: CanvasRenderingContext2D, w: number, h: number): void {
    c.clearRect(0, 0, w, h);
    for (const e of entities) {
        draw_entity(c, e);
    }
}
