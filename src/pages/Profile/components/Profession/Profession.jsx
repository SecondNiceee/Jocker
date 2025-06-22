
const hexToRgba = (hex, alpha) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

const Profession = ({professtion}) => {
   const bgColor = professtion.color ? hexToRgba(professtion.color, 0.1) : "transparent";
    return (
        <div className={`py-[3px] px-[9px] rounded-[7px] bg-[#FFD60A1A] w-fit`} style={{
          background : bgColor,
        }}>
        <p style={{
          color : professtion.color
        }} className="font-sf-pro-display tracking-wide text-[14px]">
          {professtion?.profession ?? "Не указана профессия"}
        </p>
      </div>
    );
};

export default Profession;