// Создание точки [x, y]
const createPoint = (v, k) => [k, Math.round((20 * Math.random()) + 60)];

// Создание полигона точек [[x1, y1], [x2, y2], ...]
const createPolygon = () => Array.from({ length: 101 }, createPoint);

// Эмуляция запроса полигона точек
export const fetchPolygon = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(createPolygon());
  }, 1000)
});
