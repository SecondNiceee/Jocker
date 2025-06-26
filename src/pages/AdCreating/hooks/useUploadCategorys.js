import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFirstPage } from "../../../store/taskCreating";

const useUploadCategorys = () => {
    const isCategorysUpdated = useRef(false);
    
    const categorys = useSelector((state) => state.categorys.category);

    const subCategorys = useSelector((state) => state.categorys.subCategory);

    const firstPage = useSelector((state) => state.taskCreating.firstPage);

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isCategorysUpdated.current) {
        if (categorys.length && subCategorys.length) {
            if (!firstPage.category || !firstPage.subCategory) {
            dispatch(
                setFirstPage({
                category: categorys.find((e) => e.category === "Другое"),
                subCategory: subCategorys.find((e) => e.subCategory === "Другое" && e.category.category === "Другое"),
                })
            );
            isCategorysUpdated.current = true;
            }
        }
        }
    }, [categorys, subCategorys, dispatch, firstPage]);

};

export default useUploadCategorys;