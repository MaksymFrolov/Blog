import axios, { AxiosResponse } from "axios";
import { IPost } from "../models/IPost";

export default class PostService {
    static async getPosts(page?: number, limit?: number): Promise<AxiosResponse<IPost[]>> {
        return axios.get('/api/posts', { params: { page: page, limit: limit } })
    }
    static async getPostById(id: number): Promise<AxiosResponse<IPost>> {
        return axios.get(`/api/posts/${id}`)
    }
}