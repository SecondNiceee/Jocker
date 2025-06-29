import { forwardRef, memo, useCallback} from "react";
import FirstMain from "../../components/First/FirstMain/FirstMain";
import FirstTop from "../../components/First/FirstMain/FirstTop";
import FirstLoader from "../../loaders/FirstLoader";
import { useDispatch, useSelector } from "react-redux";
import CategoryBlock from "../../components/First/CategoryBlock/CategoryBlock";
import InputBlock from "../../components/First/CategoryBlock/InputBlock";
import translation from "../../functions/translate";
import { setAdvertisementFilters } from "../../store/filters";
import { useNavigate } from "react-router";

const AllTasks = forwardRef(({
  ordersInformation,
  filterBy,
  setFilterBy,
  filters,
  setPhotoIndex,
  setSlideActive,
  setPhotos
} , ref) => {
  const orderStatus = useSelector((state) => state.information.orderStatus)
  const userInfo = useSelector((state) => state.telegramUserInfo);
  const tonConstant = useSelector((state) => state.ton.value);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const openCategoryFunc = useCallback(() => {
    navigate('/firstchoicecategory')
  }, [navigate])
  const openSubCategoryFunc = useCallback(() => {
    navigate('/firstchoicesubcategory')
  }, [navigate])
  const setValueFunc = useCallback((value) => {
    let copy = value
    if (value[0] === "0") {
      copy = copy.slice(1)
    }
    copy = copy.replace(/\s+/g, '');
    if (!isNaN(copy) && copy.length < 7) {
      dispatch(setAdvertisementFilters({ price: Number(copy) }))
    }
  }, [dispatch])
  function format(e) {
    if (translation(e).length < 7) {
      return translation(e).trim()
    }
    return translation(e).slice(0, 7).trim() + ".."
  }
  return (
    <div className="AllTasks">
      <FirstTop
        filteredBy={filterBy}
        setFilterBy={setFilterBy}
        userInfo={userInfo}
      />
      <div className="filtration-container">
        <CategoryBlock func={openCategoryFunc} name={"Категория"} value={format(filters.category.category)} />
        <CategoryBlock isActive={filters.category.id !== -1} func={openSubCategoryFunc} name={"Подкатегория"} value={filters.subCategory ? format(filters.subCategory[0].subCategory) : "Все"} />
        <InputBlock setValue={setValueFunc} value={String(filters.price)} />
      </div>
      {tonConstant !== 0 ? (
        <FirstMain
          setPhotos={setPhotos}
          setPhotoIndex={setPhotoIndex}
          setSlideActive={setSlideActive}
          orderStatus={orderStatus}
          ordersInformation={ordersInformation}
        />
      ) : (
        <FirstLoader />
      )}
    </div>
  );
});

export default memo(AllTasks);
