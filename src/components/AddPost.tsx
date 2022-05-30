import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { debounce } from 'lodash';
import { axiosClient } from '../httpclient/httpclient'

type Form = {
  title: string;
  content: string;
};

const AddPost: React.FC = () => {
  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string()
      .required('Content is required')
      .min(1, 'Content must be at least 1 character limit')
      .max(40, 'Content must not exceed 40 character limit'),
  });
  //pre-defined handy yup functions
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Form>({
    resolver: yupResolver(schema)
  });


  const debouncedRequest = useCallback(
    debounce((value) => {

      axiosClient.post("/post/", value).then(function (response) {
        console.log(response);
      })
        .catch(function (error) {
          console.log(error);
        });
      console.log(JSON.stringify(value, null, 3));
    }, 500),
    []
  );
  const onSubmit = (data: Form) => {
    debouncedRequest(data);
  };

  return (
    <div className="form">
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
            Send Post
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

export default AddPost;


