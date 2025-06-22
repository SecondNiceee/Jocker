class MenuController{
    async hideMenu(){
        if (document.documentElement.querySelector(".FirstMenu")){
            setTimeout( () => {
                document.documentElement.querySelector(".FirstMenu").style.display = "none"
            }, 0 )
        }
        else{
            await new Promise((res, rej) => setTimeout(res, 200));
            setTimeout( () => {
                document.documentElement.querySelector(".FirstMenu").style.display = "none"
            }, 0 )
        }
        
    }
    async showMenu(){
        if (document.documentElement.querySelector(".FirstMenu")){
            setTimeout( () => {
                document.documentElement.querySelector(".FirstMenu").style.display = "flex"
            }, 0 )
        }
        else{
            await new Promise((res, rej) => setTimeout(res, 200));
            setTimeout( () => {
                document.documentElement.querySelector(".FirstMenu").style.display = "flex"
            }, 0 )
        }
    }
    async lowerMenu(){
        if (document.documentElement.querySelector(".FirstMenu")){
            setTimeout( () => {
                document.documentElement.querySelector(".FirstMenu").classList.add("disappearAnimation")
                document.documentElement.querySelector(".FirstMenu").classList.remove("appearAnimation")
            }, 0 )
        }
        else{
            await new Promise((res, rej) => setTimeout(res, 200));
            setTimeout( () => {
                    document.documentElement.querySelector(".FirstMenu").classList.add("disappearAnimation")
                    document.documentElement.querySelector(".FirstMenu").classList.remove("appearAnimation")
                }, 0 )
        }
    }
    async raiseMenu(){
        if (document.documentElement.querySelector(".FirstMenu")){
            setTimeout( () => {
                document.documentElement.querySelector(".FirstMenu").classList.add("appearAnimation")
                document.documentElement.querySelector(".FirstMenu").classList.remove("disappearAnimation")
            }, 0 )
        }
        else{
            await new Promise((res, rej) => setTimeout(res, 200));
            setTimeout( () => {
                document.documentElement.querySelector(".FirstMenu").classList.add("appearAnimation")
                document.documentElement.querySelector(".FirstMenu").classList.remove("disappearAnimation")
            }, 0 )
        }
    }
}

const menuController = new MenuController();
export default menuController;