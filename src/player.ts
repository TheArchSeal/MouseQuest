import { Entity } from "./entity";
import { scaled, Vector } from "./vector"

/**
 * Player class
 * @extends Entity
 */
export class Player extends Entity {
    /** How far to move per second */
    speed: number;

    /**
     * Create a player
     * @param speed - How far to move per second
     * @param pos - Starting position
     * @param w - Width
     * @param h - Height
     */
    constructor(speed: number, pos: Vector, w: number, h: number) {
        super(pos, w, h, "red");
        this.speed = speed;
    }
};

/**
 * Current player
 */
export const player = new Player(500, scaled(100, Vector.UNIT_Y), 100, 100);
