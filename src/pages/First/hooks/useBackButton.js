import MainButton from '../../../constants/MainButton';

const useBackButton = ({isSliderOpened, responce, setResponce, setPageValue, step,  closeDetails, setSlideOpened, setStep, isBaidge}) => {
    const back = () => {
      if (!isSliderOpened){
        if (responce.isShablonModalActive) {
          setResponce((value) => ({ ...value, isShablonModalActive: false }));
        } else {
          if (responce.shablonMaker) {
            setResponce((value) => ({ ...value, shablonMaker: false }));
          } else {
            if (step === 1) {
              setStep(0);
              MainButton.setParams({
                is_active: true,
                color: "#2ea5ff",
                text_color: "#ffffff",
              });
              // mainRef.current.classList.remove('secondStep')
            } else {
              if (!isBaidge){
                  if (step === 0) {
                    setResponce({
                      text: "",
                      photos: [],
                      name: "привет",
                      isShablonModalActive: false,
                      shablonIndex: 0,
                      isShablon: false,
                      shablonMaker: false,
                    });
                    closeDetails();
                    setPageValue(false)
                  }
            }
          }
          }
        }

      }
      else{
        setSlideOpened(false)
      }
    }
    return back
};

export default useBackButton;