export const drawLine = (ctx, color, x1, y1, x2, y2) => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

export const initCoordinates2D = (ctx) => {
    for (let index = 0; index < 140; index++) {
        drawLine(ctx, '#c3c3c3', index * 5, 0, index * 5, 700);
        drawLine(ctx, '#c3c3c3', 0, index * 5, 700, index * 5);
    }
    drawLine(ctx, '#FF0000', 0, 350, 700, 350);
    drawLine(ctx, '#FF0000', 350, 0, 350, 700);

}

export const initCoordinates3D = (ctx) => {
    for (let index = 0; index < 140; index++) {
        drawLine(ctx, '#c3c3c3', index * 5, 0, index * 5, 700);
        drawLine(ctx, '#c3c3c3', 0, index * 5, 700, index * 5);
    }
    drawLine(ctx, '#FF0000', 350, 0, 350, 350);
    drawLine(ctx, '#FF0000', 350, 350, 700, 350);
    drawLine(ctx, '#FF0000', 0, 700, 350, 350);

}

export const putPixel = (ctx, x, y, color) => {
    ctx.fillStyle = color || "#FF0000";
    ctx.fillRect(x, y, 5, 5);
}

export const dda = (ctx, x0, y0, x1, y1, color) => {
    const dx = x1 - x0,
        dy = y1 - y0,
        s = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy),
        xi = dx * 1.0 / s,
        yi = dy * 1.0 / s

    let x = x0,
        y = y0;

    putPixel(ctx, x, y, color);

    for (let i = 0; i < s; i++) {
        x += xi;
        y += yi;
        putPixel(ctx, Math.round(x), Math.round(y), color);
    }
}


export const ddaDashed = (ctx, x0, y0, x1, y1, color) => {
    const dx = x1 - x0,
        dy = y1 - y0,
        s = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy),
        xi = dx * 1.0 / s,
        yi = dy * 1.0 / s

    let x = x0,
        y = y0;

    putPixel(ctx, x, y, color);

    for (let i = 0; i < s; i++) {
        x += xi;
        y += yi;
        if (i % 10 === 0) {
            putPixel(ctx, x, y, color);
        }
    }
}

// Convert x coordinate real to coordinate user
export const convertCoordinateX = (x) => {
    return x * 5 + 350;
}

// Convert y coordinate real to coordinate user
export const convertCoordinateY = (y) => {
    return 350 - y * 5;
}

export const convertCoordinateToBackX = (x) => {
    return (x - 350) / 5;
}

// Convert y coordinate real to coordinate user
export const convertCoordinateToBackY = (y) => {
    return (350 - y) / 5;
}

export const circleMidPoint = (ctx, x0, y0, radius, color) => {
    let y = radius;
    let x = 0;
    let p = 1 - radius;

    while (x <= y) {
        putPixel(ctx, x + x0, y + y0, color);
        putPixel(ctx, y + x0, x + y0, color);
        putPixel(ctx, -x + x0, y + y0, color);
        putPixel(ctx, -y + x0, x + y0, color);
        putPixel(ctx, -x + x0, -y + y0, color);
        putPixel(ctx, -y + x0, -x + y0, color);
        putPixel(ctx, x + x0, -y + y0, color);
        putPixel(ctx, y + x0, -x + y0, color);
        x++;

        if (p < 0) {
            p += 2 * x + 1;
        }
        else {
            y--;
            p += 2 * (x - y) + 1;
        }
    }
}

export const rotationPoint = (x, y, cx, cy, angle) => {
    let radians = (Math.PI / 180) * angle;
    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    let nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    let ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

export const drawText = (ctx, x, y, text, color) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = color || "black";
    ctx.fillText(text, x, y);
}