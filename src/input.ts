import { Vector } from "./vector";

/** Default controls of the game */
export enum Controls {
    LMB = "lmb",
    RMB = "rmb",
    MMB = "mmb",

    UP = "w",
    DOWN = "s",
    LEFT = "a",
    RIGHT = "d",

    BACK = "Escape",

    DEBUG = " "
};

/** Handles player inputs */
export class Input {
    /** Buttons currently held down */
    readonly held: Set<Controls>;
    /** Buttuns just pressed down */
    readonly pressed: Set<Controls>;
    /** Buttuns just released */
    readonly released: Set<Controls>;
    /** Mouse position in canvas coordinate space */
    readonly mouse_pos: Vector;

    // buttons held down the previous tick
    private readonly prev: Set<Controls>;
    // buttons released since the previous tick
    private readonly unheld: Set<Controls>;

    /** Create input handler */
    constructor() {
        this.held = new Set();
        this.pressed = new Set();
        this.released = new Set();
        this.prev = new Set();
        this.unheld = new Set();

        this.mouse_pos = Vector.ZERO.clone();
    }

    /**
     * Handles pressing a key
     * @param key - Key that was pressed
     */
    keydown(key: string) {
        // only add if bound
        if (Object.values(Controls).includes(key as Controls))
            this.held.add(key as Controls);
    }

    /**
     * Handles releasing a key
     * @param key - Key that was released
     */
    keyup(key: string) {
        // only add if bound
        if (Object.values(Controls).includes(key as Controls))
            this.unheld.add(key as Controls);
    }

    /**
     * Handles moving the mouse
     * @param pos New mouse position
     */
    mouse_move(pos: Vector) {
        this.mouse_pos.set(pos);
    }

    /** Advance inputs 1 tick */
    update() {
        this.pressed.clear();
        this.released.clear();

        // holding now but not last tick
        this.held.forEach(key => {
            if (!this.prev.has(key)) {
                this.pressed.add(key);
                this.prev.add(key);
            }
        });
        // not holding now but did last tick
        this.prev.forEach(key => {
            if (!this.held.has(key)) {
                this.released.add(key);
                this.prev.delete(key);
            }
        });

        // always hold at least one tick
        this.unheld.forEach(key => this.held.delete(key));
        this.unheld.clear();
    }
};

/** Current inputs */
export const inputs = new Input()
