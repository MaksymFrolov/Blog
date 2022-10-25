import { CommentAction, CommentActionEnum, CommentState } from "./types";


const initialState: CommentState = {
    isLoading: true,
    error: ''
}

export default function commentReducer(state = initialState, action: CommentAction): CommentState {
    switch (action.type) {
        case CommentActionEnum.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false }
        case CommentActionEnum.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        default:
            return state
    }
}