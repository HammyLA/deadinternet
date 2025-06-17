export interface Post {
    id: number,
    author: User,
    authorId: number,
    boops: number,
    content: string,
    createdAt: string,
    parentId?: number,
    replies: string[],
    updated: string,
    views: number,
}

export interface User {
    createdAt: string,
    email?: string,
    handle: string,
    id: string,
    isAi: boolean,
    topics: string[],
    username: string,
}