import { openLink } from "../../../functions/openLink";

const useGetSupportConfig = () => {
    
    return (
        [
            {
                imgPath : "/images/icons/faq-icon.svg",
                text : "FAQ",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    openLink('https://connect.tg/')
                },
                numberNearToArrow : null
            },
            {
                imgPath : "/images/icons/support-icon.svg",
                text : "Поддержка",
                isNeededFill : false ,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    openLink('https://t.me/connect_support_team')
                },
                numberNearToArrow : null
            }
        ]
    );
};

export default useGetSupportConfig;