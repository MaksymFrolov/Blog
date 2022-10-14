import { AppDispatch } from "../.."
import RegUserService from "../../../api/RegUserService"
import { IRegUser } from "../../../models/IRegUser"
import {  SetErrorAction, SetIsEnoughAction, SetIsLoadingAction, SetPageAction, SetUsersAction, UserActionEnum } from "./types"


export const UserActionCreators = {
    setUsers: (users: IRegUser[]): SetUsersAction => ({ type: UserActionEnum.SET_USERS, payload: users }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: UserActionEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): SetErrorAction => ({ type: UserActionEnum.SET_ERROR, payload }),
    setPage:(payload:number):SetPageAction=>({type: UserActionEnum.SET_PAGE, payload}),
    setIsEnough:(payload:boolean):SetIsEnoughAction=>({type:UserActionEnum.SET_IS_ENOUGH, payload}),
    loadUser: (users:IRegUser[], page=0, limit = 5) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setPage(++page))
            dispatch(UserActionCreators.setError(""))
            dispatch(UserActionCreators.setIsLoading(true))
            setTimeout(async () => {
                const response = await RegUserService.getRegUsers(page,limit)
                const mockUsers = response.data
                if (mockUsers.length!=0) {
                    dispatch(UserActionCreators.setUsers([...users, ...mockUsers]))
                }
                else {
                    dispatch(UserActionCreators.setIsEnough(false))
                }
            }, 1000)
        }
        catch (e) {
            dispatch(UserActionCreators.setError((e as Error).message))
        }
        finally{
            dispatch(UserActionCreators.setIsLoading(false))
        }
    }
}