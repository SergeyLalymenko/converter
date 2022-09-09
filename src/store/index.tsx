import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currenciesListSlice from './currenciesListSlice';
import currenciesLiveSlice from './currenciesLiveSlice';

const rootReducer = combineReducers({
    currenciesList: currenciesListSlice,
    currenciesLive: currenciesLiveSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
