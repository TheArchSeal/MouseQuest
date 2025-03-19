import { Vector } from "./vector"

export type Entity = {
    pos: Vector,
    w: number,
    h: number,
    src: string | HTMLImageElement
};

export const entities: Entity[] = [];

export function z_val(e: Entity): number {
    return e.pos.y;
}

export function make_entity(pos: Vector, w: number, h: number, src: string | HTMLImageElement): Entity {
    const e = { pos, w, h, src };

    entities.push(e);
    entities.sort((a, b) => z_val(a) - z_val(b));

    return e;
}

export function move_entity(e: Entity, pos: Vector): void {
    e.pos = pos;
    entities.sort((a, b) => z_val(a) - z_val(b));
}

export function destroy_entity(e: Entity) {
    const i = entities.indexOf(e);
    if (i >= 0) entities.splice(i, 1);
}
