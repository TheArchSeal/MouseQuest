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
     * @param size - Size
     */
    constructor(speed: number, pos: Vector, size: Vector) {
        super(pos, size, "red");
        this.speed = speed;
    }
};

/** Current player */
export const player = new Player(500, new Vector(0, 100), new Vector(100, 100));
