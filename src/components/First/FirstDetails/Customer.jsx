import { useCallback } from 'react';
import RatingText from '../../UI/RatingText/RatingText';
import UserIcon from '../../UI/UserIcon/UserIcon';
import { useNavigate } from 'react-router';
const Customer = ({user, isActive}) => {
    const navigate = useNavigate();
    const onClick = useCallback( () => {
        if (isActive){
            navigate(`/Baidge/${user.id}`)
        }
    }, [navigate, isActive, user.id] )
    return (
        <div onClick={onClick} className='flex flex-col gap-[7.67px] w-full mt-2'>
            <p className="ml-[17px] text-[#84898F] font-sf-pro-display-400 text-[13.33px] leading-[15.643px]">ЗАКАЗЧИК</p>
            <div className='flex w-full rounded-[13.33px] py-[12px] bg-card pl-[19px] pr-[16px]'>
                <UserIcon small={true} user={user} />
                <div className='flex flex-col ml-[10.33px] gap-[2.33px]'>
                    <header className='flex gap-[5px]'>
                        <h2 className='text-white font-sf-pro-display text-[17.33px] leading-[18.311px]'>
                            {user.fl}
                        </h2>
                        <RatingText user={user} />
                    </header>
                    <p className='text-[#B5CED9] font-sf-pro-display-400 text-[14.667px] leading-[17.667px]'>
                        {user.profession ? user.profession.profession : "Профиль"}
                        
                    </p>
                </div>
                <img className="ml-auto"  src={"/images/newProfile/leftArrow.svg"} alt="" />
            </div>
            
        </div>
    );
};

export default Customer;