
const DevelopmentMainButton = ({goForward, className}) => {
    
    if (process.env.NODE_ENV === "development"){
        return (
            <div
            onClick={goForward}
            className={`fixed left-1/2 z-50 top-1/2 rounded p-2 border-black border-solid border-2 cursor-pointer ${className}`}
            >
            MAIN BUTTON
            </div>
        )
    }

};

export default DevelopmentMainButton;