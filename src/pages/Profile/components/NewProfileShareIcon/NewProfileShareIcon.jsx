import { shareProfession } from "../../../../functions/shareProression";

const NewProfileShareIcon = ({professionName, userId}) => {

    return (
        <div onClick={shareProfession(userId, professionName)} className='bg-[#223d52] rounded-full items-center flex justify-center  w-[30px] h-[30px]'>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.793704 10.7283C1.19949 6.02613 5.61683 3.38942 7.89269 3.12781C8.08864 3.10529 8.24698 2.94636 8.24698 2.74911V0.711072C8.24698 0.393692 8.63003 0.233987 8.85549 0.457362L14.5443 6.09352C14.6895 6.23737 14.6846 6.4735 14.5335 6.61118L8.84471 11.7964C8.6154 12.0055 8.24698 11.8428 8.24698 11.5325V9.01641C8.24698 8.81917 8.08717 8.65849 7.89016 8.66808C5.42465 8.78816 2.79412 10.1096 1.34383 11.0369C1.09786 11.1942 0.768602 11.0192 0.793704 10.7283Z" fill="#2EA5FF" />
</svg>
        </div>
    );
};

export default NewProfileShareIcon;