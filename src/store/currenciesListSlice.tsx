import api from '../api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
    data: string[] | null,
};

export const fetchCurrenciesList = createAsyncThunk(
    'user/fetchCurrenciesList',
    async function(_, { rejectWithValue }) {
        try {
            const { data } = await api.get('/list');

            if(!data.success) {
                throw new Error('Can not fetch currencies list!');
            }

            return [...Object.keys(data.currencies)];
        } catch(err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState: initialStateType = {
    data: null,
};

const currenciesListSlice = createSlice({
    name: 'currenciesList',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCurrenciesList.fulfilled.type]: (state: initialStateType, action: PayloadAction<string[]> ) => {
            state.data = action.payload;
        },
    },
});

export default currenciesListSlice.reducer;
