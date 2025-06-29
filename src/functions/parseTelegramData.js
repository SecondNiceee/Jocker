export default function parseTelegramData(data) {
  const params = new URLSearchParams(data);
  const obj = {};

  for (const [key, value] of params.entries()) {
    try {
      // Пытаемся распарсить JSON-строки (например, user)
      obj[key] = JSON.parse(decodeURIComponent(value.replace(/\+/g, ' ')));
    } catch (e) {
      obj[key] = decodeURIComponent(value.replace(/\+/g, ' '));
    }
  }

  return obj;
}