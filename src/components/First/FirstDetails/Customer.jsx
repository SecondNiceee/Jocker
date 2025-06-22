
import Text from '../../Text/Text';
import { useNavigate } from 'react-router';
import useGetUserPhotoLink from '../../../hooks/useGetUserPhotoLink';
const Customer = ({customerName, rate, userPhoto, id, userId}) => {
    const navigate = useNavigate();
    const link = useGetUserPhotoLink({anotherUserInfo : {photo : userPhoto, id : userId}});
    return (
        <div onClick={() => {
            navigate(`/Baidge/${id}`)
        }} className = 'customerContainer'>
            <Text className='customer__up'>Заказчик</Text>
            <div className="customer__information">
                <img style={{
                    borderRadius : '50%',
                    objectFit : "cover"
                }} className='information-icon' src={link} alt="" />
                <div className="customer__information-right">
                    <div className="customer__information-right-name">
                        <Text>{customerName.length > 15 ? 
                        customerName.substring(0, 13) + '..'
                        : 
                        customerName
                    }</Text>
                        <img src= {"/images/icons/Subtract.svg"} alt="" />
                    </div>
                    <div className="customer__information-right-rate">
                        {/* <div className="customer__information-right-rate-images">
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                                <img src={Star} alt="" />
                        </div> */}
                        <Text className='rate'>Нет рейтинга</Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;