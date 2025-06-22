function sortFiles(photosNames , files){

    let removedArr = []
    let addedArr = []
    for (let fileName of photosNames ){

          if (!files.includes(fileName)){
            removedArr.push(fileName)
          }
      }
       
    for (let file of files){
      if (file instanceof File){
        addedArr.push(file)
      }
    }
    return {
        removedArr : removedArr,
        addedArr : addedArr
    }
    
}
export default sortFiles