import { Outlet } from "react-router";
import { isIphone } from "../functions/isIphone";


const AppLayout = () => {
    if (!process.env.NODE_ENV === "development"){
      if (!isIphone()){
          return <Outlet />    
      }
    }
    return (
    <div className="flex flex-col">             
      <div className="fixed connect-header left-0 z-[999999999] pb-[9.5px] top-0 h-[95px] w-full bg-[#18222D] gap-[6px] justify-center flex items-end">
        <img  src={"/images/Header/Logo_Header.svg"} alt="headerIcon"/>
      </div>
      <div className="pt-[95px] flex flex-col flex-1">
        <Outlet  /> {/* Здесь будут UserProfile или UserPosts */}
      </div>
    </div>
    );
};

export default AppLayout;