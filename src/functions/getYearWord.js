export default function getYearWord(years) {
    // Проверяем последние две цифры числа
    if (years === null || years === undefined) return '0 лет';
    
    const lastTwoDigits = years % 100;
  
    // Если последние две цифры находятся в диапазоне 11-14, то всегда "лет"
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${years} лет`;
    }
  
    // Проверяем последнюю цифру числа
    const lastDigit = years % 10;
  
    if (lastDigit === 1) {
      return `${years} год`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${years} года`;
    } else {
      return `${years} лет`;
    }
  }