import axios, { AxiosResponse } from "axios";
import { IPost } from "../models/IPost";

export default class PostService {
    static async getPosts(page?: number, limit?: number): Promise<AxiosResponse<IPost[]>> {
        return axios.get('/api/posts', { params: { page, limit } })
    }
    static async getPostById(id: number): Promise<AxiosResponse<IPost>> {
        return axios.get(`/api/posts/${id}`)
    }
    static async getPostsByUserId(id: number, page?: number, limit?: number): Promise<AxiosResponse<IPost[]>> {
        return axios.get(`/api/people/${id}/posts`, { params: { page, limit } })
    }
    static async addPost(post: IPost): Promise<AxiosResponse> {
        return axios.post(`/api/posts`, post)
    }
    static async updatePost(post: IPost, id: number): Promise<AxiosResponse> {
        return axios.put(`/api/posts/${id}`, post)
    }
    static async deletePost(id: number): Promise<AxiosResponse> {
        return axios.delete(`/api/posts/${id}`)
    }
}