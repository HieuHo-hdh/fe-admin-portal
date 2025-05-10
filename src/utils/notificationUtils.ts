import { ShowNotificationPayload } from '@/models/Notification.model';

export function createNotificationPayload(
  type: 'success' | 'error',
  message: string,
  description?: string,
): ShowNotificationPayload {
  const notificationDescription =
    description || (type === 'success' ? `${message} successfully` : `${message} failed`);
  return { type, message, description: notificationDescription };
}
