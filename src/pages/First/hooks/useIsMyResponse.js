import { useMemo } from "react";
import { USERID } from "../../../constants/tgStatic.config";
import { useSelector } from "react-redux";

const useIsMyResponse = ({detailsAdertisement}) => {
  const myLocalResponses = useSelector((state) => state.information.myLocalResponses);
      const isMyResponse = useMemo( () => {
        if (detailsAdertisement){
          if ( myLocalResponses.map((response) => response.advertisement.id).includes(detailsAdertisement.id) ) {
            return true
          }
          if (detailsAdertisement.responces){
            if (detailsAdertisement.responces.find((e) =>
              String(e.user.id) === String(USERID)))
            {
              return true
            }
            else{
              return false
            }
          }
        }
        return false
        // eslint-disable-next-line
      },[detailsAdertisement ] )

      const isMyTask = useMemo( () => {
        if (detailsAdertisement){
            if (String(detailsAdertisement.user.id) === String(USERID)){
              return true
            }
            return false;
        }

        return false
        // eslint-disable-next-line
      },[detailsAdertisement ] )
      return {isMyResponse, isMyTask}
};

export default useIsMyResponse;