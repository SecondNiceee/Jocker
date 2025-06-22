
const useGetLinksFormatedArray = ({links, isFirstMyLink}) => {

    const notRecognisedLinks = []


    const tgName = isFirstMyLink ? "@" + links[0]  : ""
    let dribbleLink = null;
    let behanceLink = null;
    let artstationLink = null;
    let deviantartLink = null;
    let pinterestLink = null;
    let githubLink = null;
    let gitlabLink = null;
    let bitbucketLink = null;
    let codepenLink = null;
    let replitLink = null;
    let youtubeLink = null;
    let vimeoLink = null;
    let tiktokLink = null;
    let instagramLink = null;
    let telegramChannelLink = null;
    let linkedinLink = null;
    let hhRuLink = null;
    let notionLink = null;
    let tildaLink = null;
    let readymagLink = null;
    let webflowLink = null;
    let framerLink = null;
    let figmaLink = null;

    for (let i = isFirstMyLink ? 1 : 0; i < links?.length; i++){
        let isRecognisedLink = false;

        if (links[i].includes("https://t.me/")){
            telegramChannelLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://www.behance.net/")){
            behanceLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://dribbble.com")){
            dribbleLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://www.artstation.com")){
            artstationLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://www.deviantart.com")){
            deviantartLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://ru.pinterest.com")){
            pinterestLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://github.com/")){
            githubLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://gitlab.com")){
            gitlabLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://codepen.io")){
            codepenLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://replit.com")){
            replitLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://www.youtube.com")){
            youtubeLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://vimeo.com")){
            vimeoLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes("https://www.tiktok.com")){
            tiktokLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes('https://www.instagram.com')){
            instagramLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes('https://www.linkedin.com')){
            linkedinLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes('https://hh.ru')){
            hhRuLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes('https://www.notion.com')){
            notionLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes('https://tilda.cc')){
            tildaLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes('https://readymag.com')){
            readymagLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes('https://webflow.com')){
            webflowLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes('https://www.framer.com')){
            framerLink = links[i]
            isRecognisedLink = true;
        }
        if (links[i].includes('https://www.figma.com/')){
            figmaLink = links[i]
            isRecognisedLink = true;
        }

        if (!isRecognisedLink){
            notRecognisedLinks.push({
                title : "Сайт",
                profession : links[i],
                link : links[i]
            })
        }
    }
    
    const linksArray = [
        {
            title : "Мой Telegram",
            profession : tgName,
            link : `https://t.me/${tgName.slice(1)}`,
        },
        {
            title : "HH",
            profession : "Опыт и резюме",
            link : hhRuLink
        },
        {
            title : "Telegram-канал",
            profession : telegramChannelLink ? "@" + telegramChannelLink.split("/").pop() : '',
            link : telegramChannelLink,
        },
        {
            title : "Behance",
            profession : "Портфолио",
            link : behanceLink,
        },
        {
            title : "ArtStation",
            profession : "Портфолио",
            link : artstationLink
        },
        {
            title : "Dribbble",
            profession  : "Портфолио",
            link : dribbleLink
        },
        {
            title : "DeviantArt",
            profession : "Портфолио",
            link : deviantartLink
        },
        {
            title : "Pinterest",
            profession : "Портфолио",
            link : pinterestLink
        },
        {
            title : "Notion",
            profession : "Портфолио",
            link : notionLink
        },
        {
            title : "GitLab",
            profession : "Код и разработка",
            link : gitlabLink
        },
        {
            title : "GitHub",
            profession : "Код и разработка",
            link : githubLink
        },
        {
            title : "Bitbucket",
            profession : "Код и разработка",
            link : bitbucketLink
        },
        {
            title : "CodePen",
            profession : "Код и разработка",
            link : codepenLink
        },
        {
            title : "Replit",
            profession : "Код и разработка",
            link : replitLink
        },
        {
            title : "YouTube",
            profession : "Видео и ролики",
            link : youtubeLink,
        },
        {
            title : "Vimeo",
            profession : "Видео и ролики",
            link : vimeoLink
        },
        {
            title : "TikTok",
            profession : "Видео и ролики",
            link : tiktokLink
        },
        {
            title : "Instagram",
            profession : "Соц.ceти",
            link : instagramLink
        },
        {
            title : "LinkedIn",
            profession : "Опыт и резюме",
            link : linkedinLink
        },
        {
            title : "Tilda",
            profession : "Веб-сайт",
            link : tildaLink
        },
        {
            title : "Readymag",
            profession : "Веб-сайт",
            link : readymagLink
        },
        {
            title : "Webflow",
            profession : "Веб-сайт",
            link : webflowLink 
        },
        {
            title : "Framer",
            profession : "Веб-сайт",
            link : framerLink
        },
        {
            title : "Figma",
            profession : "Веб-дизайн",
            link : figmaLink
        },
        ...notRecognisedLinks
    ]

    return linksArray;
};

export default useGetLinksFormatedArray;