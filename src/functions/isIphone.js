export const isIphone = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  // Для новых iPadOS может не работать стандартный способ
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

  // Отдельная проверка для iPadOS на основе платформы и touch points
  const isIPadOS = navigator.platform === 'MacIntel' && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;

  // iPhone — это iOS, но не iPad и не iPadOS
  const isIphone = isIOS && !isIPadOS && !/iPad|iPod/.test(ua);

  return isIphone;
};