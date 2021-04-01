import axios from 'axios';

const getPosts = async () => {
  const response = await axios({
    baseURL: "https://bloggy-api.herokuapp.com",
    method: 'GET',
    url: `/posts`,
  });
  return response.data;
};

const getPost = async (postId) => {
  if (postId) {
    const response = await axios({
      baseURL: "https://bloggy-api.herokuapp.com",
      method: 'GET',
      url: `/posts/${postId}?_embed=comments`,
    });
    return response.data;
  };
};

const updatePost = async (postId, data) => {
  if (data) {
    const response = await axios({
      baseURL: "https://bloggy-api.herokuapp.com",
      method: 'PUT',
      url: `/posts/${postId}`,
      data,
    });
    return response;
  };
};

const createPost = async (data) => {
  if (data) {
    const response = await axios({
      baseURL: "https://bloggy-api.herokuapp.com",
      method: 'POST',
      url: `/posts`,
      data,
    });
    return response;
  };
};

const createComment = async (data) => {
  if (data) {
    const response = await axios({
      baseURL: "https://bloggy-api.herokuapp.com",
      method: 'POST',
      url: `/comments`,
      data,
    });
    return response;
  };
};


const deletePost = async (postId) => {
  const response = await axios({
    baseURL: "https://bloggy-api.herokuapp.com",
    method: 'DELETE',
    url: `/posts/${postId}`,
  });
  return response;
};

export {
  getPosts,
  getPost,
  updatePost,
  createPost,
  createComment,
  deletePost,
};