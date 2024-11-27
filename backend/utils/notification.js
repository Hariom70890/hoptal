// utils/notifications.js
const sendNotification = async (userId, title, message, type, relatedId) => {
    try {
        const notification = new Notification({
            userId,
            title,
            message,
            type,
            relatedId
        });
        await notification.save();
        
        // Here you could add real-time notification using WebSocket
        // or push notification using FCM/APNS
    } catch (error) {
        console.error('Notification error:', error);
    }
};

module.exports = { sendNotification };