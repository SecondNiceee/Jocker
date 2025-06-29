import translation from "./translate";

const lett = translation("лет");
const goda = translation("года");
const god = translation("год");
export const formateAgeString = (ageString) => {
  let numb = Number(
    ageString.slice(ageString.length - 1, ageString.length)
  );
  if (Number(ageString) > 10 && Number(ageString) < 20) {
    return `${ageString} ${lett}`
  } else {
    if (numb > 1 && numb < 5) {
        return `${ageString} ${goda}`
    } else {
      if (numb === 1) {
        return `${ageString} ${god}`
      } else {
       return `${ageString} ${lett}`
      }
    }
  }
};
