import axios, { AxiosResponse } from "axios";
import { IToken } from "../models/IToken";


export default class TokenService{
    static async refreshToken(token: IToken):Promise<AxiosResponse<IToken>>{
        return axios.post(`/api/tokens/refresh`, token)
    }
    static async revokeToken(token: IToken):Promise<AxiosResponse>{
        return axios.post(`/api/tokens/revoke`, token)
    }
}