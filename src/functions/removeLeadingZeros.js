export default function removeLeadingZeros(str) {
  let i = 0;
  while (i < str.length && str[i] === '0') {
    i++;
  }
  return str.slice(i) || '';
}