export const openLink = (link) => {
    if (link.includes("https://t.me")){
        window.Telegram.WebApp.openTelegramLink(link);
    }
    else{
        window.Telegram.WebApp.openLink(link)
    }
}