export default function limitText(arg) {
    if (arg) {
      let str = arg.split(" ");
      let rezult = "";
      for (let word of str) {
        if (rezult.length < 15) {
          rezult += word + " ";
        } else {
          rezult = rezult.slice(0, rezult.length - 1);
          if (rezult[rezult.length - 1] === ",") {
            rezult = rezult.slice(0, rezult.length - 1);
          }
          rezult += "..";
          break;
        }
      }

      return rezult;
    }
    return "";
  }