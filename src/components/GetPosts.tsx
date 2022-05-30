import React from 'react'
import { axiosClient } from '../httpclient/httpclient'
import { Post, PostsProps, Posts } from "./props/Props"
import PostPreview from './PostPreview';


class GetPosts extends React.Component<PostsProps, Posts>  {

    constructor(props: PostsProps) {
        super(props);

        this.state = {
            posts: [],
            fetchSuccess: false
        };
    }

    async componentDidMount() {
        //console.log("component mounted");
        let posts;
        if (this.state.posts.length < 1) {
            try {
                const postResponse = await axiosClient.get("http://localhost:8081/api/post/");
                posts = postResponse.data;
            }
            catch (e: any | Error) {
                console.log("Posts could not be fetched.Reason : " + e);
                return;
            }
            try {
                await Promise.all(posts.map(async (post: Post) => {
                    const comment = await axiosClient.get(`http://127.0.0.1:8082/comments/search/count/?postId=${post.id}`);
                    post.commentCount = comment.data;
                }));
            }
            catch (e: any) {
                console.error("Comment count could not be fetched.Reason : " + e?.message);
            }
            this.setState({ posts: posts, fetchSuccess: true });
        }
    }

    public render() {
        const posts = this.state.posts;
        //posts.map((post, i) => console.log(i, post));
        return (
            <div>
                {posts.length === 0 && (
                    <div className="text-center">
                        <h2>No posts found</h2>
                    </div>
                )}

                {posts.length > 0 && posts.map((post, i) =>
                    <PostPreview post={post} key={post.id} />
                )}

            </div>)
    }
}
export default GetPosts;