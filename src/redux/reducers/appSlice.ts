import { NotificationType } from '@/models/Notification.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  notification: AppNotification | null;
  fullScreenLoading: boolean;
}

export interface AppNotification {
  type: NotificationType;
  message: string;
  description?: string;
}

const initialState: AppState = {
  notification: null,
  fullScreenLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<AppNotification>) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    showFullScreenLoading: (state) => {
      state.fullScreenLoading = true;
    },
    hideFullScreenLoading: (state) => {
      state.fullScreenLoading = false;
    },
  },
});

export const { showNotification, clearNotification } = appSlice.actions;
export default appSlice.reducer;
