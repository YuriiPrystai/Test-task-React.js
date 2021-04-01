import React, { useState, useEffect} from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import shortid from 'shortid';

import { getPosts, deletePost } from '../requests';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .link {
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 3px;
    text-decoration: none;
    background-color: #D3FFCD;

    :hover {
      box-shadow: 0 0 5px #5AA64F;
    }
  }
`;
const PostBlock = styled.div`
  width: 700px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 2rem;
  padding: 1rem;
`;
const PostId = styled.h5`
  margin: 0;
`;
const Button = styled.button`
  color: palevioletred;
  font-size: 20px;
  margin: 0;
  padding: 5px 20px;
  border: 2px solid palevioletred;
  border-radius: 3px;

  :hover {
    cursor: pointer;
    box-shadow: 0 0 4px palevioletred;
  }
`;

function Posts() {

  const [listPosts, setListPosts] = useState();

  useEffect(() => {
    getPosts().then(data => {
      setListPosts(data);
    });
  },[]);

  const HandleDeletePost = (deletePostId) => {
    deletePost(deletePostId).then((res) => {
      if (res.status === 200) {
        getPosts().then(data => {
          setListPosts(data);
        });
      } else {
        alert('Server Error');
      }
    });
  }

  return (
    <Wrapper>
      <h1>Posts Page</h1>
      <Link className="link" to={`/create`}>Create new post</Link>
      {
        !listPosts ?
        <h1>Server Error or there are not any posts</h1> : 
        listPosts.map((post) => <PostBlock key={shortid()}>
          <PostId>{post.id}</PostId>
          <hr/>
          <h2>{post.title}</h2>
          <hr/>
          <p>
            {post.body}
          </p>
          <Link className="link" to={`/post/${post.id}`}>Open post</Link>
          <Button onClick={() => HandleDeletePost(post.id)}>Delete Post</Button>
        </PostBlock>)
      }
    </Wrapper>
  );
}

export default Posts;