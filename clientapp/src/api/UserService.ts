import axios, { AxiosResponse } from "axios";
import { IToken } from "../models/IToken";
import { IUser } from "../models/IUser";

export default class UserService {
    static async login(user: IUser): Promise<AxiosResponse<IToken>> {
        console.log(user)
        return axios.post<IToken>('/api/auth', user)
    }
}