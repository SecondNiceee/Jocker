import { useState } from "react";

const useSlider = () => {
      const [isSliderOpened, setSlideOpened] = useState(false)
      
      const [photos, setPhotos] = useState([])
    
      const [photoIndex, setPhotoIndex] = useState(0);
      
      return {isSliderOpened, setSlideOpened, photos, setPhotos, photoIndex, setPhotoIndex};
};

export default useSlider;