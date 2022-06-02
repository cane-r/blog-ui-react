import { FC, useEffect, useState } from 'react'
import { useParams, RoutesProps } from 'react-router-dom';
import { axiosClient } from '../../httpclient/httpclient'
import { Post } from '../props/Props';
import './GetPosts.css';

const EditPosts: FC<RoutesProps> = () => {

    const [posts, setPosts] = useState<Post[] | null>(null);
    const { id } = useParams();

    useEffect(() => {
        axiosClient.get("http://localhost:8081/api/post/").then((post) => {
            setPosts(post.data);
        })
        //const comments = await axiosClient.get(`http://127.0.0.1:8082/comments/search/byId/?postId=${post.id}`);
        //and FIXME : Use gateway path later..
    }, [posts, id]);


    return (
        <div className="row">
            {!posts && (
                <div className="text-center">
                    <h2>No posts found</h2>
                </div>
            )}
            {/* {posts && posts.length > 0 && posts.map((post, i) =>
                <div className="card" key={post?.id}>
                    <div className="card-body">
                        <h5 className="card-title">{post?.title}</h5>
                        <p className="card-text">{post?.content}</p>
                    </div>
                </div>
            } */}
        </div>
    );
}
export default EditPosts;