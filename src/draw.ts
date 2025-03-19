import { square } from "./update";

export function draw(c: CanvasRenderingContext2D, w: number, h: number): void {
    c.clearRect(0, 0, w, h);
    c.fillRect(square.x, square.y, square.w, square.h);
}
