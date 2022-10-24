export interface IRegUser {
    id: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    postIds: number[],
    commentIds: number[]
}