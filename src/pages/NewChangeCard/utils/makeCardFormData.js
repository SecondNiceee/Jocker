import sortFiles from "../../../functions/sortFiles"

export const makeCardFormData = ({isCardNew, card, categoryId}) => {
    console.log(card);
    let myFormData = new FormData()
    myFormData.append("title" , String(card.title).trim())
    myFormData.append("description" , String(card.description.trim()))
    myFormData.append("categoryId" , String(1))  
    console.log(card);
    if (isCardNew){
        card.photos.forEach(e => {
            myFormData.append('photos' , e)
        })
    }
    else{
        const files = sortFiles(card.photosNames , card.photos);
        files.addedArr.forEach((e,i) => {
        myFormData.append(`addFiles` , e)
        })
    
        files.removedArr.forEach( (e, i )  => {
        myFormData.append(`deleteFiles[${i}]` , e)
        })

        console.log(files);
    }
    card.links.filter(link => link.length).forEach( (link, i) => {
        myFormData.append(`links[${i}]`, link.trim())
    } ) 
    return myFormData;
}