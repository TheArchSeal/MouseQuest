import { set_state, State } from "./game";
import { Controls, Input } from "./input";
import { in_rect, sum, Vector } from "./vector";

/** Dialog choice */
export class Choice {
    /** Text displayed to player */
    readonly text: string;
    /** Dialog this choice lead to */
    readonly next: null | Dialog;
    /** Side effects of choice */
    readonly consequences: () => void;

    /**
     * Create a choice
     * @param text - Text displayed to player
     * @param next - Dialog this choice lead to
     * @param consequences - Side effects of choice, optional
     */
    constructor(text: string, next: null | Dialog, consequences?: () => void) {
        this.text = text;
        this.next = next;
        this.consequences = consequences ?? (() => { });
    }
}

/** Dialog graph */
export class Dialog {
    // index of text screen
    private i: number;
    // Screens of text displayed to player
    private readonly text: string[];
    // Choices that can be made
    private readonly choices: Choice[]

    /**
     * Create a dialog
     * @param text - Screens of text displayed to player
     * @param choices - Choises that can be made
     */
    constructor(text: string[], choices: Choice[]) {
        this.i = 0;
        this.text = text;
        this.choices = choices;
    }

    /**
     * Advances the text screen by one
     * @returns The next text screen or null if none exist
     */
    next(): null | string {
        return this.i < this.text.length
            ? this.text[this.i++]
            : null;
    }

    /**
     * The options the player can choose
     * @returns Array of text of choises user can make or null if none exist
     */
    options(): null | string[] {
        return this.i < this.text.length || this.choices.length === 0
            ? null
            : this.choices.map(c => c.text);
    }

    /**
     * Chooses an option
     * @param option - Index of the option chosen
     * @returns The next dialog in the graph
     * @precondition The index is valid
     */
    choose(option: number): null | Dialog {
        this.choices[option].consequences();
        return this.choices[option].next;
    }
}

// UI dialog element
class DialogBox {
    // dialog it represents
    readonly dialog: Dialog;
    // current text being displayed
    text: null | string;

    // pos in canvas
    readonly pos: Vector;
    // size in canvas
    readonly size: Vector;

    // Create a dialog element
    constructor(pos: Vector, size: Vector, dialog: Dialog) {
        this.pos = pos;
        this.size = size;
        this.dialog = dialog;
        this.text = dialog.next();
    }

    // Andvances th etext screen by one
    next() {
        const next = this.dialog.next();
        if (next !== null) {
            this.text = next;
        }
    }
}

// current dialog
var dialog_box: null | DialogBox = null;

// space between dialog box and bottom of screen
const margin = 50;
// space between dialog box edge and content
const padding = 20;

/**
 * Set current dialog and switch to dialog state
 * @param dialog - Dialog to display
 * @param w - Width of canvas
 * @param h - Hidth of canvas
 */
export function start_dialog(dialog: Dialog, w: number, h: number) {
    const size = new Vector(1080, 360);
    const pos = new Vector(
        (w - size.x) / 2,
        h - size.y - margin
    );

    dialog_box = new DialogBox(pos, size, dialog);
    set_state(State.DIALOG);
}

/**
 * Advance dialog 1 tick
 * @param inputs - Inputs made this tick
 * @param dt - Delta time in seconds
 * @param w - Width of canvas
 * @param h - Hidth of canvas
 */
export function update(inputs: Input, dt: number, w: number, h: number): void {
    if (dialog_box) {
        if (inputs.released.has(Controls.LMB)) {
            if (in_rect(
                inputs.mouse_pos,
                dialog_box.pos,
                sum(dialog_box.pos, dialog_box.size)
            )) {
                dialog_box.next();
            }
        }
    }

    if (inputs.pressed.has(Controls.BACK)) {
        set_state(State.OVERWORLD);
    }
}

// Returns array of lines after word wrapping
function word_wrap(c: CanvasRenderingContext2D, text: string, max_width: number): string[] {
    const output: string[] = [];
    let current: string = "";

    text.split("\n").forEach(line => {
        line.split(" ").forEach(word => {
            if (current) {
                const width = c.measureText(current + " " + word).width;
                if (width <= max_width) {
                    current += " " + word;
                } else {
                    output.push(current);
                    current = word;
                }
            } else {
                current = word;
            }
        });

        output.push(current);
        current = "";
    });

    return output;
}

/**
 * Draw the dialog
 * @param c - Canvas contex to draw on
 * @param w - Width of canvas
 * @param h - Height of canvas
 */
export function draw(c: CanvasRenderingContext2D, w: number, h: number) {
    if (dialog_box) {
        const font_size = 30;
        const line_spacing = 40;
        const margin = 50;
        const padding = 20;

        // draw box
        c.fillStyle = "gray";
        c.strokeStyle = "black";
        c.fillRect(dialog_box.pos.x, dialog_box.pos.y, dialog_box.size.x, dialog_box.size.y);
        c.strokeRect(dialog_box.pos.x, dialog_box.pos.y, dialog_box.size.x, dialog_box.size.y);

        // draw text
        if (dialog_box.text) {
            c.font = `${font_size}px Arial`;
            c.fillStyle = "black";

            const max_width = dialog_box.size.x - padding * 2;
            const lines = word_wrap(c, dialog_box.text, max_width);
            lines.forEach((line, i) => c.fillText(
                line,
                dialog_box!.pos.x + padding,
                dialog_box!.pos.y + padding + font_size + line_spacing * i
            ));
        }
    }
}
