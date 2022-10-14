import {AuthActionCreators} from "./auth/action-creators";
import { UserActionCreators } from "./user/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...UserActionCreators
}