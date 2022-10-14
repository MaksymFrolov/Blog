import axios, { AxiosResponse } from "axios";
import { IRegUser } from "../models/IRegUser";

export default class RegUserService {
    static async getRegUsers(page?: number,limit?: number): Promise<AxiosResponse<IRegUser[]>> {
        return axios.get('https://jsonplaceholder.typicode.com/users', {
            params: {_page:page,_limit: limit}
        })
    }
}