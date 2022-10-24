import { AppDispatch } from "../.."
import RegUserService from "../../../api/RegUserService"
import { IRegUser } from "../../../models/IRegUser"
import { SetErrorAction, SetIsLoadingAction, SetUserAction, UserActionEnum } from "./types"


export const UserActionCreators = {
    setUser: (user: IRegUser): SetUserAction => ({ type: UserActionEnum.SET_USER, payload: user }),
    setError: (payload: string): SetErrorAction => ({ type: UserActionEnum.SET_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: UserActionEnum.SET_IS_LOADING, payload }),
    loadUser: (id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setIsLoading(true))
            const response = await RegUserService.getRegUsersById(id)
            const mockUser = response.data
            if (mockUser) {
                dispatch(UserActionCreators.setUser(mockUser))
            }
            else {
                dispatch(UserActionCreators.setError("Not Found."))
            }
        }
        catch (e) {
            dispatch(UserActionCreators.setError((e as Error).message))
        }
    }
}