import axios, { AxiosResponse } from "axios";
import { IComment } from "../models/IComment";

export default class CommentService {
    static async getComment(page?: number, limit?: number): Promise<AxiosResponse<IComment[]>> {
        return axios.get('https://jsonplaceholder.typicode.com/comments', {
            params: { _page: page, _limit: limit }
        })
    }
}