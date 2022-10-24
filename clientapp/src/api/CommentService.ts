import axios, { AxiosResponse } from "axios";
import { IComment } from "../models/IComment";

export default class CommentService {
    static async getCommentByPostId(id: number, page?: number, limit?: number): Promise<AxiosResponse<IComment[]>> {
        return axios.get(`/api/posts/${id}/comments`, { params: { page: page, limit: limit } })
    }
}