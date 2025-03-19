export const square = {
    x: 0,
    y: 0,
    dx: 250,
    dy: 250,
    w: 100,
    h: 100
};

export function update(dt: number, w: number, h: number): void {
    square.x += square.dx * dt;
    square.y += square.dy * dt;

    if (square.x < 0) {
        square.x = 0;
        square.dx = -square.dx;
    } else if (square.x + square.w > w) {
        square.x = w - square.w;
        square.dx = -square.dx;
    }

    if (square.y < 0) {
        square.y = 0;
        square.dy = -square.dy;
    } else if (square.y + square.h > h) {
        square.y = h - square.h;
        square.dy = -square.dy;
    }
}
