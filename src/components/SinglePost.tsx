import { FC, useEffect, useState } from 'react'
import { useParams, RoutesProps } from 'react-router-dom';
import { axiosClient } from '../httpclient/httpclient'
import './GetPosts.css';
import { Post } from "./props/Props"

const SinglePost: FC<RoutesProps> = () => {

    const [post, setPost] = useState<Post | null>(null);
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get(`http://localhost:8081/api/post/${id}`).then((post) => {
            setPost(post.data);
        })
        //const comments = await axiosClient.get(`http://127.0.0.1:8082/comments/search/byId/?postId=${post.id}`);
        //and FIXME : Use gateway path later..
    }, [post, id]);


    return (
        <div className="row">
            <div className="card" key={post?.id}>
                <div className="card-body">
                    <h5 className="card-title">{post?.title}</h5>
                    <p className="card-text">{post?.content}</p>
                    <p className="card-text"> Post Created At : {post?.createdAt}</p>
                    <p className="card-text">Post Last updated at : {post?.updatedAt}</p>
                    <p className="card-text"> Later load comments with it..  </p>
                </div>
            </div>
        </div>
    );
}
export default SinglePost;