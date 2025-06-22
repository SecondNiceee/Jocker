const useCardsController = ({setChangedCard}) => {
    const changeCardDescription = (description) => {
        setChangedCard((value) => ({...value, description : description}))
    }
    const changeCardTitle = (e) => {
        const value = e.target.value;
        setChangedCard((changedCard) => ({...changedCard, title : value}))
    }
    const changePhotos = (photos) => {
        setChangedCard( (value) => ({...value, photos : photos}) )
    }

    return {changeCardDescription, changeCardTitle, changePhotos}
};

export default useCardsController;