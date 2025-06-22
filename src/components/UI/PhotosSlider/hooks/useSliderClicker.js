export const useSliderClicker = ({setPhotoIndex, setPhotos, photos, setSlideOpened}) => {
    return (photoIndex) => () => {
        setPhotoIndex(photoIndex)
        setPhotos(photos)
        setSlideOpened(true)
    }
}