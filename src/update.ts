import { make_entity, move_entity } from "./entity";
import { Controls } from "./main";
import { player } from "./player";
import { add, is_zero, normalize, scale, sub, unit_x, unit_y, zero_vector } from "./vector";

var debug_held: boolean = false;

export function update(inputs: Set<string>, dt: number, w: number, h: number): void {
    var velocity = zero_vector;

    if (inputs.has(Controls.UP)) velocity = sub(velocity, unit_y);
    if (inputs.has(Controls.DOWN)) velocity = add(velocity, unit_y);
    if (inputs.has(Controls.LEFT)) velocity = sub(velocity, unit_x);
    if (inputs.has(Controls.RIGHT)) velocity = add(velocity, unit_x);

    if (inputs.has(Controls.DEBUG)) {
        if (!debug_held) {
            debug_held = true;

            make_entity(player.pos, 50, 50, "blue")
        }
    } else {
        debug_held = false;
    }

    if (!is_zero(velocity)) {
        velocity = scale(player.speed * dt, normalize(velocity));
        move_entity(player, add(player.pos, velocity));
    }
}
