import { IRegUser } from "../../../models/IRegUser"

export interface UserState {
    user: IRegUser
    isLoading: boolean
    error: string
}

export enum UserActionEnum {
    SET_ERROR = 'SET_USER_ERROR',
    SET_USER = 'SET_USER',
    SET_IS_LOADING = 'SET_USER_IS_LOADING'
}

export interface SetErrorAction {
    type: UserActionEnum.SET_ERROR
    payload: string
}
export interface SetUserAction {
    type: UserActionEnum.SET_USER
    payload: IRegUser
}
export interface SetIsLoadingAction {
    type: UserActionEnum.SET_IS_LOADING
    payload: boolean
}

export type UserAction =
    SetErrorAction |
    SetUserAction |
    SetIsLoadingAction