/** 2D euclidean vector */
export class Vector {
    /** x coordiante */
    x: number;
    /** y coordinate */
    y: number;

    /**
     * Create a vector
     * @param x - x coordinate
     * @param y - y coordinate
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Clones this vector
     * @returns A new vector with same coordinates
     */
    clone(): Vector {
        return new Vector(this.x, this.y);
    }

    /**
     * Sets coordiantes to match another vector
     * @param v - Vector match
     * @returns Itself
     */
    set(v: Vector): Vector {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    /**
     * Checks equality
     * @param v - Vector to compare
     * @returns Wether the coordinates are the same
     */
    is(v: Vector): boolean {
        return this.x === v.x && this.y === v.y;
    }

    /**
     * Vector addition
     * @param v - Vector to add
     * @returns Itself
     */
    add(v: Vector): Vector {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * Vector subtraction
     * @param v - Vector to subtract
     * @returns Itself
     */
    sub(v: Vector): Vector {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * Vector scaling
     * @param c - Scalar to use
     * @returns Itself
     */
    scale(c: number): Vector {
        this.x *= c;
        this.y *= c;
        return this;
    }

    /**
     * Euclidean inner product
     * @param v - Second vector
     * @returns The dot product
     */
    dot(v: Vector): number {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * The euclidean norm
     * @returns Length of the vector
     */
    length(): number {
        return Math.sqrt(this.dot(this));
    }

    /**
     * Scales to have length 1
     * @precondition length > 0
     * @returns Itself
     */
    normalize(): Vector {
        return this.scale(1 / this.length());
    }

    /**
     * Smallest positive angle to vector
     * @param v - Vector to use
     * @returns The angle between the vectors
     * @precondition both lengths > 0
     */
    angle(v: Vector): number {
        return Math.acos(this.dot(v) / (this.length() * v.length()));
    }

    /**
     * Zero vector
     */
    static readonly ZERO = new Vector(0, 0);
    /**
     * First standard basis vector
     */
    static readonly UNIT_X = new Vector(1, 0);
    /**
     * Create second standard basis vector
     */
    static readonly UNIT_Y = new Vector(0, 1);
};

/**
 * Checks equality
 * @param v - First vector
 * @param w - Second vector
 * @returns Wether the coordiantes are equal
 */
export function eq(v: Vector, w: Vector): boolean {
    return v.is(w);
}

/**
 * Adds multiple vectors
 * @param vs - Array of terms
 * @returns Sum of the vectors in vs
 */
export function sum(...vs: Vector[]): Vector {
    const u = Vector.ZERO.clone();
    vs.forEach(v => u.add(v));
    return u;
}

/**
 * Vector difference
 * @param v - Minuend
 * @param w - Subtrahend
 * @returns The minuend minus the subtrahend
 */
export function difference(v: Vector, w: Vector): Vector {
    return v.clone().sub(w);
}

/**
 * Vector scaling
 * @param c - Scalar
 * @param v - Vector
 * @returns A scaled vector
 */
export function scaled(c: number, v: Vector) {
    return v.clone().scale(c);
}

/**
 * Additative inverse
 * @param v - Vector to negate
 * @returns A negative vector
 */
export function neg(v: Vector): Vector {
    return scaled(-1, v);
}

/**
 * Inner product
 * @param v - First vector
 * @param w - Second vector
 * @returns The inner product
 */
export function inner_prod(v: Vector, w: Vector): number {
    return v.dot(w);
}

/**
 * Vector norm
 * @param v - Vector to measure
 * @returns The norm of the vector
 */
export function norm(v: Vector): number {
    return v.length();
}
/**
 * Finds the normalized vector
 * @param v - The vector to use
 * @returns A unit vector with the same direction
 * @precondition length > 0
 */
export function unit(v: Vector): Vector {
    return v.clone().normalize();
}

/**
 * Finds the angle between two vectors
 * @param v - First vector
 * @param w - Second vector
 * @precondition - both lengths > 0
 */
export function angle(v: Vector, w: Vector): number {
    return v.angle(w);
}

/**
 * Checks if vector has length 0
 * @param v - Vector to check
 * @returns Wether it is the zero vector
 */
export function is_zero(v: Vector): boolean {
    return inner_prod(v, v) === 0;
}

/**
 * Checks if vector is within a rectangle
 * @param v - Vector to check
 * @param a - First corner
 * @param b - Second corder
 * @returns Wether the vector to check is within the bounds of the other two
 */
export function in_rect(v: Vector, a: Vector, b: Vector): boolean {
    const left = Math.min(a.x, b.x);
    const right = Math.max(a.x, b.x);
    const top = Math.min(a.y, b.y);
    const bottom = Math.max(a.y, b.y);
    return left <= v.x && v.x <= right && top <= v.y && v.y <= bottom;
}