export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export type ShowNotificationPayload = {
  type: NotificationType;
  message: string;
  description: string;
};
