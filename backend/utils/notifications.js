// utils/notifications.js
import Notification from "../models/Notification.js";

export const createNotification = async ({ title, message, userId }) => {
  try {
    const notification = new Notification({ title, message, userId });
    await notification.save();
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};
