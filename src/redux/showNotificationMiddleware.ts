// middlewares/showMessageOnSuccess.ts
import { isRejected, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { isFulfilled } from '@reduxjs/toolkit';
import { showNotification } from '@/redux/reducers/appSlice';
import { ShowNotificationPayload } from '@/models/Notification.model';

function isShowNotificationPayload(payload: unknown) {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'type' in payload &&
    'message' in payload &&
    'description' in payload &&
    typeof payload.type === 'string' &&
    typeof payload.message === 'string' &&
    typeof payload.description === 'string'
  );
}
export const handleShowMessage: Middleware = (store) => (next) => (action) => {
  // Check if it's a fulfilled action from createAsyncThunk
  if (
    (isFulfilled(action) || isRejected(action) || isRejectedWithValue(action)) &&
    action.payload &&
    isShowNotificationPayload(action.payload)
  ) {
    const notificationDetail = action.payload as unknown as ShowNotificationPayload;
    // Dispatch your message action
    store.dispatch(showNotification(notificationDetail));
  }
  return next(action);
};
