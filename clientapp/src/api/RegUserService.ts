import axios, { AxiosResponse } from "axios";
import { IRegUser } from "../models/IRegUser";
import { IUser } from "../models/IUser";

export default class RegUserService {
    static async getRegUsers(page?: number, limit?: number): Promise<AxiosResponse<IRegUser[]>> {
        return axios.get('/api/people', {
            params: { page, limit }
        })
    }
    static async getRegUsersById(id: number): Promise<AxiosResponse<IRegUser>> {
        return axios.get(`/api/people/${id}`)
    }
    static async addUser(user: IUser) : Promise<AxiosResponse>{
        return axios.post(`/api/people`, user)
    }
    static async updateUser(user: IUser, id: number) : Promise<AxiosResponse>{
        return axios.put(`/api/people/${id}`, user)
    }
    static async deleteUser(id: number) : Promise<AxiosResponse>{
        return axios.delete(`/api/people/${id}`)
    }
}