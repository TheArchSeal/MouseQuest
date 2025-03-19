import { Entity, make_entity } from "./entity";
import { scale, unit_y, Vector } from "./vector"

export type Player = Entity & {
    speed: number,
};

export function make_player(speed: number, pos: Vector, w: number, h: number): Player {
    const player = make_entity(pos, w, h, "red") as Player;
    player.speed = speed;
    return player;
}

export const player = make_player(500, scale(100, unit_y), 100, 100);
