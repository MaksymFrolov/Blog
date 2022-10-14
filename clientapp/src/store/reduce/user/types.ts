import { IRegUser } from "../../../models/IRegUser"


export interface UserState {
    users: IRegUser[]
    isLoading: boolean
    error: string
    page: number
    limit: number
    enough: boolean
}

export enum UserActionEnum {
    SET_ERROR = 'SET_ERROR',
    SET_USERS = 'SET_USERS',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_PAGE = 'SET_PAGE',
    SET_IS_ENOUGH = 'SET_IS_ENOUGH'
}

export interface SetErrorAction {
    type: UserActionEnum.SET_ERROR
    payload: string
}
export interface SetUsersAction {
    type: UserActionEnum.SET_USERS
    payload: IRegUser[]
}
export interface SetIsLoadingAction {
    type: UserActionEnum.SET_IS_LOADING
    payload: boolean
}
export interface SetPageAction {
    type: UserActionEnum.SET_PAGE
    payload: number
}
export interface SetIsEnoughAction {
    type: UserActionEnum.SET_IS_ENOUGH
    payload: boolean
}
export type UserAction =
    SetErrorAction |
    SetIsLoadingAction |
    SetUsersAction |
    SetPageAction |
    SetIsEnoughAction