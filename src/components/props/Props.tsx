export interface Post {
    title: string,
    content: string,
    approved: boolean,
    processed: boolean,
    id: number,
    createdAt: string,
    updatedAt: string,
    commentCount: number;
}
export interface PostsProps {
}
export interface Posts {
    posts: Array<Post>;
    fetchSuccess: boolean;
}

export interface SinglePostProps extends PostPreviewProps {
    //fetchSuccess: boolean;
    postObj: Post;
}

export interface PostPreviewProps {
    post: Post;
}
