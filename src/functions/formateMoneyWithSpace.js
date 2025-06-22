export default function formatNumberWithSpaces(number) {
    return new Intl.NumberFormat('ru-RU').format(number)
  }