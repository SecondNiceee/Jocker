export const softVibration = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
}