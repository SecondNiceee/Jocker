export default function formateDateForTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsPast = Math.floor((now - date) / 1000);

  if (secondsPast < 60) {
    return secondsPast < 0 ? 'только что' : `${secondsPast} секунд${plural(secondsPast, ['у', '', ''])} назад`;
  }

  const minutesPast = Math.floor(secondsPast / 60);
  if (minutesPast < 60) {
    return `${minutesPast} минут${plural(minutesPast, ['', 'у', ''])} назад`;
  }

  const hoursPast = Math.floor(minutesPast / 60);
  if (hoursPast < 24) {
    return `${hoursPast} час${plural(hoursPast, ['', 'а', 'ов'])} назад`;
  }

  const daysPast = Math.floor(hoursPast / 24);
  if (daysPast === 1) {
    return 'вчера';
  }
  if (daysPast < 7) {
    return `${daysPast} день назад`;
  }

  const weeksPast = Math.floor(daysPast / 7);
  if (weeksPast < 4) {
    return `${weeksPast} неделю назад`;
  }

  const monthsPast = Math.floor(daysPast / 30);
  if (monthsPast < 12) {
    return `${monthsPast} месяц назад`;
  }

  const yearsPast = Math.floor(monthsPast / 12);
  return `${yearsPast} год назад`;
}
  
  // Вспомогательная функция для правильного окончания слов
  function plural(n, endings) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
  
    if (n > 10 && n < 20) return endings[2]; // исключение для 11-19
    if (n1 === 1) return endings[0];         // один — окончание endings[0]
    if (n1 >= 2 && n1 <= 4) return endings[1]; // два/три/четыре — endings[1]
    return endings[2];                        // остальное — множественное число (пять и больше)
  }