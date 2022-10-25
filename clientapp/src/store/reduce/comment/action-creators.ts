import { AppDispatch } from "../..";
import CommentService from "../../../api/CommentService";
import { IComment } from "../../../models/IComment";
import { CommentActionEnum, SetErrorAction, SetIsLoadingAction } from "./types";


export const CommentActionCreators = {
    setError: (payload: string): SetErrorAction => ({ type: CommentActionEnum.SET_ERROR, payload }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: CommentActionEnum.SET_IS_LOADING, payload }),
    addComment: (comment: IComment, id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentActionCreators.setIsLoading(true))
            await CommentService.addComment(comment, id)
            dispatch(CommentActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(CommentActionCreators.setError((e as Error).message))
        }
    },
    updateComment: (comment: IComment, postId: number, commentId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentActionCreators.setIsLoading(true))
            await CommentService.updateComment(comment, postId, commentId)
            dispatch(CommentActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(CommentActionCreators.setError((e as Error).message))
        }
    },
    deleteComment: (postId: number, commentId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentActionCreators.setIsLoading(true))
            await CommentService.deleteComment(postId, commentId)
            dispatch(CommentActionCreators.setIsLoading(false))
        }
        catch (e) {
            dispatch(CommentActionCreators.setError((e as Error).message))
        }
    }
}