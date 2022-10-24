import { IToken } from "../../../models/IToken"
import { IUser } from "../../../models/IUser"

export interface AuthState {
    isAuth: boolean
    user: IUser
    token: IToken
    isLoading: boolean
    error: string
}

export enum AuthActionEnum {
    SET_AUTH = 'SET_AUTH',
    SET_ERROR = 'SET_AUTH_ERROR',
    SET_USER = 'SET_AUTH_USER',
    SET_TOKEN = 'SET_AUTH_TOKEN',
    SET_IS_LOADING = 'SET_AUTH_IS_LOADING'
}

export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH
    payload: boolean
}
export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR
    payload: string
}
export interface SetAuthUserAction {
    type: AuthActionEnum.SET_USER
    payload: IUser
}
export interface SetAuthTokenAction {
    type: AuthActionEnum.SET_TOKEN
    payload: IToken
}
export interface SetIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING
    payload: boolean
}

export type AuthAction =
    SetAuthAction |
    SetErrorAction |
    SetIsLoadingAction |
    SetAuthUserAction |
    SetAuthTokenAction