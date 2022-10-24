import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IToken } from "../../../models/IToken";
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetAuthUserAction, SetAuthTokenAction } from "./types";

export const AuthActionCreators = {
    setUser: (user: IUser): SetAuthUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
    setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),
    setToken: (payload: IToken): SetAuthTokenAction => ({ type: AuthActionEnum.SET_TOKEN, payload }),
    login: (login: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const response = await UserService.login({login: login, password: password})
            const token = response.data
            if (token) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('login', login)
                localStorage.setItem('token', token.token)
                localStorage.setItem('refresh', token.refreshToken)
                axios.defaults.headers.common["Authorization"] = `Bearer ${token.token}`;
                dispatch(AuthActionCreators.setUser({login: login, password: password}))
                dispatch(AuthActionCreators.setIsAuth(true))
                dispatch(AuthActionCreators.setToken(token))
            }
            else {
                dispatch(AuthActionCreators.setError("Not found."))
            }
        }
        catch (e) {
            dispatch(AuthActionCreators.setError((e as Error).message))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('login')
        localStorage.removeItem('token')
        localStorage.removeItem('refrsh')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
        dispatch(AuthActionCreators.setToken({} as IToken))
        delete axios.defaults.headers.common["Authorization"];
    }
}