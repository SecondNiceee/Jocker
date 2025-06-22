import { useEffect } from "react";
import { useSelector } from "react-redux";

const useMenuRejection = ({setCategoryOpen, setDetailsActive, setBaidge, setBaidgeUserId, setResponce, setStep, setSubCategory  }) => {
    const changer = useSelector( state => state.menuSlice.changer )
    useEffect( () => {
      setCategoryOpen(false)
      setDetailsActive((value) => ({...value , isOpen : false}))
      setBaidge(false)
      setBaidgeUserId(0)
      setResponce((value) => ({...value , isShablon : false , isShablonModalActive: false, shablonMaker : false}))
      setStep(0)
      setSubCategory(false)
    } , [changer, setBaidge, setBaidgeUserId, setCategoryOpen, setDetailsActive, setResponce, setStep, setSubCategory] )
};

export default useMenuRejection;