import { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { debounce } from 'lodash';
import { axiosClient } from '../httpclient/httpclient'
import { RoutesProps, useNavigate, useParams } from 'react-router-dom';
import { Post } from './props/Props';

type Form = {
    title: string;
    content: string;
};

const EditPost: FC<RoutesProps> = () => {

    const [post, setPost] = useState<Post>({} as Post);
    const [error, setError] = useState<boolean>(false);
    const [ok, setOk] = useState<boolean>(false);
    const { id } = useParams();
    const go = useNavigate();

    useEffect(() => {
        axiosClient.get("http://localhost:8081/api/post/" + id).then((post) => {
            setPost(post.data);
            setValue('title', post.data.title, { shouldValidate: true })
            setValue('content', post.data.content, { shouldValidate: true })
        }).catch(function (error) {
            setError(true);
            setTimeout(() => go("/posts/"), 3000);
        });
        //const comments = await axiosClient.get(`http://127.0.0.1:8082/comments/search/byId/?postId=${post.id}`);
        //and FIXME : Use gateway path later..
    }, []);

    useEffect(() => {
        //reset(post);
    }, [post]);

    const schema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string()
            .required('Content is required')
            .min(1, 'Content must be at least 1 character limit')
            .max(40, 'Content must not exceed 40 character limit'),
    });
    //pre-defined react hook form functions
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<Post>({
        resolver: yupResolver(schema)
    });


    const debouncedRequest = useCallback(
        debounce((value) => {
            axiosClient.put("http://127.0.0.1:8081/api/post/" + id, value).then(function (response) {
                console.log(response);
                setOk(true);
                setTimeout(() => go("/posts/"), 3000);
            })
                .catch(function (error) {
                    setError(true);
                    setTimeout(() => go("/posts/"), 3000);
                });
        }, 500),
        []
    );
    const onSubmit = (data: Form) => {
        debouncedRequest(data);
    };

    return (
        <div className="form">
            {error && (
                <div className="alert alert-danger" role="alert">
                    Error while editing this page.Redirecting..
                </div>
            )}

            {ok && (
                <div className="alert alert-success" role="alert">
                    Editing success.Redirecting..
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        {...register('title')}
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        {...register('content')}
                        className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.content?.message}</div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="btn btn-warning float-right"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;


