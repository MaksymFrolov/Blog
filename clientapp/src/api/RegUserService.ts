import axios, { AxiosResponse } from "axios";
import { IRegUser } from "../models/IRegUser";

export default class RegUserService {
    static async getRegUsers(page?: number, limit?: number): Promise<AxiosResponse<IRegUser[]>> {
        return axios.get('/api/people', {
            params: { page: page, limit: limit }
        })
    }
    static async getRegUsersById(id: number): Promise<AxiosResponse<IRegUser>> {
        return axios.get(`/api/people/${id}`)
    }
}