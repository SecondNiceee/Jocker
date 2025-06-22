export const successVibration = () => {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
}