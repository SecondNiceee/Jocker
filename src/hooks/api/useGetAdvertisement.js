import { useEffect, useState } from 'react';
import { getAdvertisementById } from '../../functions/api/getAdvertisemetById';

const useGetAdvertisement = ({id}) => {

    const [orderInformation, setOrderInformation] = useState();

    const [advertisementStatus, setAdvertisementStatus] = useState("pending");


    useEffect(() => {
      getAdvertisementById(id)
        .then((advertisement) => {
          setOrderInformation(advertisement);
          setAdvertisementStatus("fullfiled");
        })
        .catch((err) => {
          console.warn(err);
          setAdvertisementStatus("rejected");
        });
        
    }, [id]);
    return {orderInformation, advertisementStatus}
};

export default useGetAdvertisement;