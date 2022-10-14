import { IRegUser } from "../../../models/IRegUser"
import { UserAction, UserActionEnum, UserState } from "./types"


const initialState: UserState = {
    error: '',
    isLoading: false,
    users: [] as IRegUser[],
    page: 0,
    limit: 5,
    enough: true
}

export default function userReducer(state = initialState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionEnum.SET_USERS:
            return { ...state, users: action.payload, isLoading: false }
        case UserActionEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false }
        case UserActionEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        case UserActionEnum.SET_PAGE:
            return { ...state, page: action.payload }
        case UserActionEnum.SET_IS_ENOUGH:
            return { ...state, enough: action.payload }
        default:
            return state
    }
}