import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authService } from '@/services/authService';

export const store = configureStore({
    reducer: {
        auth: authReducer,

        [authService.reducerPath]: authService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authService.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;