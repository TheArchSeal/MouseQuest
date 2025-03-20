/**
 * Default controls of the game
 */
export enum Controls {
    UP = "w",
    DOWN = "s",
    LEFT = "a",
    RIGHT = "d",

    DEBUG = "Enter"
}

/**
 * Handles player inputs
 */
export class Input {
    /**
     * Buttons currently held down
     */
    readonly held: Set<Controls>;
    /**
     * Buttuns just pressed down
     */
    readonly pressed: Set<Controls>;
    /**
     * Buttuns just released
     */
    readonly released: Set<Controls>;

    // buttons held down the previous tick
    private readonly prev: Set<Controls>;

    /**
     * Create input handler
     */
    constructor() {
        this.held = new Set();
        this.pressed = new Set();
        this.released = new Set();
        this.prev = new Set();
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
        this.held.delete(key as Controls);
    }

    /**
     * Advance inputs 1 tick
     */
    update() {
        this.pressed.clear();
        this.released.clear();

        this.held.forEach(key => {
            if (!this.prev.has(key)) {
                this.pressed.add(key);
                this.prev.add(key);
            }
        });
        this.prev.forEach(key => {
            if (!this.held.has(key)) {
                this.released.add(key);
                this.prev.delete(key);
            }
        });
    }
}

/**
 * Current inputs
 */
export const inputs = new Input()
