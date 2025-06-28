export default function fetchWithTimeout(url, options = {}, timeout = 3000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => {
        reject(new Error(`Превышен таймаут запроса: ${url}`));
      }, timeout)
    )
  ]);
}