export default function formatViews(count) {
  const remainder100 = count % 100;
  if (remainder100 >= 11 && remainder100 <= 19) {
    return `${count} просмотров`;
  }

  const remainder10 = count % 10;
  switch (remainder10) {
    case 1:
      return `${count} просмотр`;
    case 2:
    case 3:
    case 4:
      return `${count} просмотра`;
    default:
      return `${count} просмотров`;
  }
}