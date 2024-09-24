// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auth/authSlice.js';
import storage from 'redux-persist/lib/storage';
import profileReducer from './profile/profileSlice.js';
import aiReducer from './ai/aiSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist/es/constants';

// persist config
const persistConfig = {
  key: 'root',
  storage,
};

// combine reducers

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  ai: aiReducer,
});

const persistentReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistentReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
