import { useMemo } from 'react';

const useGetSrcIcon = ({text}) => {
    const iconSrc = useMemo( () => {
        if (text.includes("https://t.me/")){
            return "/images/BaidgeCreating/telegram.svg"
        }
        if (text.includes("https://www.behance.net/")){
            return "/images/BaidgeCreating/behance.svg"
        }
        if (text.includes("https://dribbble.com")){
           return "/images/BaidgeCreating/dribble.svg"
        }
        if (text.includes("https://www.artstation.com")){
            return "/images/BaidgeCreating/ArtStation.svg"
        }
        if (text.includes("https://www.deviantart.com")){
            return "/images/BaidgeCreating/devianArt.svg"
        }
        if (text.includes("https://ru.pinterest.com")){
            return "/images/BaidgeCreating/pinterest.svg"
        }
        if (text.includes("https://github.com/")){
            return "/images/BaidgeCreating/gitHub.svg"
        }
        if (text.includes("https://gitlab.com")){
            return "/images/BaidgeCreating/gitLab.svg"
        }
        if (text.includes("https://codepen.io")){
            return "/images/BaidgeCreating/codePen.svg"
        }
        if (text.includes("https://replit.com")){
            return "/images/BaidgeCreating/replit.svg"
        }
        if (text.includes("https://www.youtube.com")){
            return "/images/BaidgeCreating/youTube.svg"
        }
        if (text.includes("https://vimeo.com")){
            return "/images/BaidgeCreating/vimeo.svg"
        }
        if (text.includes("https://www.tiktok.com")){
            return "/images/BaidgeCreating/tikTok.svg"
        }
        if (text.includes('https://www.instagram.com')){
            return "/images/BaidgeCreating/instagram.svg"
        }
        if (text.includes('https://www.linkedin.com')){
            return "/images/BaidgeCreating/linkedIn.svg"
        }
        if (text.includes('https://hh.ru')){
            return "/images/BaidgeCreating/hh.svg"
        }
        if (text.includes('https://www.notion.com')){
            return "/images/BaidgeCreating/Notion.svg"
        }
        if (text.includes('https://tilda.cc')){
            return "/images/BaidgeCreating/tilda.svg"
        }
        if (text.includes('https://www.figma.com/')){
            return "/images/BaidgeCreating/figma.svg"
        }
        return "/images/BaidgeCreating/non-internet.svg"
    } , [text] )
    return iconSrc
};

export default useGetSrcIcon;