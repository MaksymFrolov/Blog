import axios, { AxiosResponse } from "axios";
import { IPost } from "../models/IPost";

export default class PostService {
    static async getPosts(page?: number, limit?: number): Promise<AxiosResponse<IPost[]>> {
        return axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: { _page: page, _limit: limit }
        })
    }
    static async getPostById(id: number): Promise<AxiosResponse<IPost>> {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    }
}