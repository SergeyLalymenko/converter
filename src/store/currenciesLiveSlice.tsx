import api from '../api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type dashboardLiveItemType = {
    key: string,
    base: string,
    value: object,
    converted: string,
}

type converterLiveItemType = {
    base: string,
    converted: string,
    value: number,
}

type currencyDataType = {
    base: string,
    converted: string,
    amount: number,
}

type initialStateType = {
    dashboardData: dashboardLiveItemType[] | null,
    converterData: converterLiveItemType | null,
};

export const fetchDashboardCurrenciesLive = createAsyncThunk(
    'user/fetchDashboardCurrenciesLive',
    async function(baseCurrency: string, { rejectWithValue }) {
        try {
            const { data } = await api.get(`/live?source=${baseCurrency}`);

            if(!data.success) {
                throw new Error('Can not fetch currencies live!');
            }

            return data.quotes;
        } catch(err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchConvertorCurrenciesLive = createAsyncThunk(
    'user/fetchConvertorCurrenciesLive',
    async function(currencyData: currencyDataType, { rejectWithValue }) {
        try {
            const { data } = await api.get(`/live?source=${currencyData.base}&currencies=${currencyData.converted}`);

            if(!data.success) {
                throw new Error('Can not fetch currencies live!');
            }

            return {
                amount: currencyData.amount,
                base: currencyData.base,
                data: data.quotes,
            };
        } catch(err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState: initialStateType = {
    dashboardData: null,
    converterData: null,
};

const currenciesLiveSlice = createSlice({
    name: 'currenciesLive',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchDashboardCurrenciesLive.fulfilled.type]: (state: initialStateType, action: PayloadAction<object[]> ) => {
            const result: dashboardLiveItemType[] = [];

            for(let key in action.payload) {
                result.push({
                    key: key,
                    base: key.substring(0, 3),
                    converted: key.substring(3, 6),
                    value: action.payload[key],
                });
            }

            state.dashboardData = result;
        },
        [fetchConvertorCurrenciesLive.fulfilled.type]: (state: initialStateType, action: PayloadAction<any> ) => {
            let result: converterLiveItemType = {
                base: `${action.payload.amount} ${action.payload.base}`,
                converted: action.payload.base,
                value: action.payload.amount,
            };

            for(let key in action.payload.data) {
                result = {
                    base: `${action.payload.amount} ${key.substring(0, 3)}`,
                    converted: key.substring(3, 6),
                    value: action.payload.data[key] * action.payload.amount,
                };
            }

            state.converterData = result;
        },
    },
});

export default currenciesLiveSlice.reducer;
