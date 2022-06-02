import React, { FC } from 'react'
import './GetPosts.css';
import { PostPreviewProps } from "./props/Props"


const PostPreview: FC<PostPreviewProps> = ({ post }: PostPreviewProps) => {

    //posts.map((post, i) => console.log(i, post));
    return (
        <div className="row">
            {!post && (
                <div className="text-center">
                    <h2>No posts found</h2>
                </div>
            )}
            <div className="card" key={post.id}>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content.length > 100 ? post.content.substring(0, 5) + ".." : post.content}</p>
                    <p className="card-text"> Post Created At : {post.createdAt}</p>
                    <p className="card-text">Post Last updated at : {post.updatedAt}</p>
                    <p className="card-text"> There {post.commentCount > 1 ? "are" : "is"}  {post.commentCount ? post.commentCount : "no"} comment{post.commentCount > 1 ? "s" : ""} in this post. </p>
                    <p><a href={`/posts/${post.id}`} className="btn btn-primary text-center">Read More...</a></p>
                    <p><a href={`/posts/edit/${post.id}`} className="btn btn-primary text-center">Edit this post</a></p>
                </div>
            </div>
        </div>
    )
}

export default PostPreview;