// src/redux/slices/answerValueSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnswerValueState {
    value: Record<string, string[]>;
}

const initialState: AnswerValueState = {
    value: {},
};

export const answerValueSlice = createSlice({
    name: 'answerValue',
    initialState,
    reducers: {
        setAnswerValue: (state, action: PayloadAction<Record<string, string[]>>) => {
            state.value = action.payload;
        },
    },
});

export const { setAnswerValue } = answerValueSlice.actions;

export default answerValueSlice.reducer;