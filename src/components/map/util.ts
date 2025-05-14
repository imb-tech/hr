export function getPolygonCentroid(coordinates: number[][][]): {
  x: number;
  y: number;
} {
  const polygon = coordinates[0]; // faqat tashqi ringni olamiz
  let area = 0;
  let x = 0;
  let y = 0;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [x0, y0] = polygon[i];
    const [x1, y1] = polygon[j];
    const f = x0 * y1 - x1 * y0;

    area += f;
    x += (x0 + x1) * f;
    y += (y0 + y1) * f;
  }

  area *= 0.5;
  if (area === 0) {
    // fallback: o‘rtacha nuqta
    const total = polygon.reduce(
      (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]],
      [0, 0],
    );

    return { x: total[0] / polygon.length, y: total[1] / polygon.length };
  }

  x /= 6 * area;
  y /= 6 * area;

  return { x, y };
}

export const polygonColors = [
  "#81E7AF",
  "#6FE6FC",
  "#F2E2B1",
  "#CDC1FF",
  "#B3C8CF",
  "#B6FFA1",
  "#F6EACB",
];
