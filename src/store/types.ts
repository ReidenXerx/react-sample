import { Reducer } from "react"

export type ReducerHandlersHash<StateType> = {
    [actionType: string]: Reducer<StateType, Action<StateType>>
}

export type Action<StateType> = {
    type: string,
    payload: Partial<StateType>,
}

