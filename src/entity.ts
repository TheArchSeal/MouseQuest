import { Vector } from "./vector"

/**
 * Base entity class
 */
export class Entity {
    /** Position */
    pos: Vector;
    /** Width */
    w: number;
    /** Hight */
    h: number;
    /** Source image or color */
    src: string | HTMLImageElement;

    /**
     * Create an entity
     * @param pos - Position
     * @param w - Width
     * @param h - Height
     * @param src - Souce image or color
     */
    constructor(pos: Vector, w: number, h: number, src: string | HTMLImageElement) {
        this.pos = pos;
        this.w = w;
        this.h = h;
        this.src = src;

        insert_entity(this);
    }

    /**
     * Remove from enitites
     */
    kill(): void {
        remove_entity(this);
    }

    /**
     * How close or far it is from the camera
     * @returns The z-index
     */
    z_index(): number {
        return this.pos.y;
    }

    /**
     * Change postion
     * @param pos - New postion
     */
    move_to(pos: Vector): void {
        this.pos = pos;
        update_entity(this);
    }

    /**
     * Move a distance
     * @param pos - Vector to move by
     */
    move_by(pos: Vector): void {
        this.pos.add(pos);
        update_entity(this);
    }
};

/**
 * Create an entity
 * @param pos - Position
 * @param w - Width
 * @param h - Height
 * @param src - Souce image or color
 */
export function create_entity(pos: Vector, w: number, h: number, src: string | HTMLImageElement): void {
    new Entity(pos, w, h, src);
}

/**
 * Array of all entities
 */
export const entities: Entity[] = [];

// Sort all entities by z-index
function sort_entities(): void {
    entities.sort((a, b) => a.z_index() - b.z_index());
}


// Insert entity while keeping them sorted
function insert_entity(e: Entity): void {
    // binary search
    let low = 0;
    let high = entities.length;
    while (low < high) {
        let mid = (low + high) >>> 1; // floor div by 2
        if (entities[mid].z_index() < e.z_index()) low = mid + 1;
        else high = mid;
    }
    entities.splice(low, 0, e);
}

// Remove entity while keeping them sorted
function remove_entity(e: Entity): void {
    const i = entities.indexOf(e);
    if (i >= 0) entities.splice(i, 1);
}

// Sort the entity
function update_entity(e: Entity): void {
    remove_entity(e);
    insert_entity(e);
}
