export type Vector = { readonly x: number, readonly y: number };

export function make_vector(x: number, y: number): Vector {
    return { x, y };
}

export const zero_vector = make_vector(0, 0);
export const unit_x = make_vector(1, 0);
export const unit_y = make_vector(0, 1);

export function vector_eq(u: Vector, v: Vector): boolean {
    return u.x === v.x && u.y === v.y;
}

export function is_zero(u: Vector): boolean {
    return vector_eq(u, zero_vector)
}

export function add(u: Vector, v: Vector): Vector {
    return make_vector(v.x + u.x, v.y + u.y);
}

export function sum(...vs: Vector[]): Vector {
    return vs.reduce(add, zero_vector);
}

export function neg(v: Vector): Vector {
    return make_vector(-v.x, -v.y);
}

export function sub(u: Vector, v: Vector): Vector {
    return add(u, neg(v));
}

export function scale(c: number, v: Vector): Vector {
    return make_vector(c * v.x, c * v.y);
}

export function inner_prod(u: Vector, v: Vector): number {
    return u.x * v.x + u.y * v.y;
}

export function length(v: Vector): number {
    return Math.sqrt(inner_prod(v, v));
}

export function normalize(v: Vector): Vector {
    return scale(1 / length(v), v);
}

