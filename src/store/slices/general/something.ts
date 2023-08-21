import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const defaultValue = { field1: 0 }

export type Something = {
    field1: number
}

export type SomethingState = {
    value: Something
}

const initialState: SomethingState = {
    value: defaultValue,
};

export const somethingSlice = createSlice({
    name: 'something',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateSomethingAction: (
            state: SomethingState,
            action: PayloadAction<Something | null>,
        ) => {
            if (action.payload) {
                state.value = { ...state.value, ...action.payload }
            } else {
                state.value = defaultValue
            }
        },
    },
})

// Actions
export const { updateSomethingAction } = somethingSlice.actions

export default somethingSlice