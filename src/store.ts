import { configureStore } from '@reduxjs/toolkit';
import fifoReducer from './slices/fifo.slice';

export const store = configureStore({
  reducer: {
    fifo: fifoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
