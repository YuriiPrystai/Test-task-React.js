import React  from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

import { createPost } from '../requests';

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  const PostBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 800px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 2rem;
    padding: 1rem;
  `;
  const HeadText = styled.h4`
    margin: 0;
  `;
  const Input = styled.input`
    width: 80%;
    font-size: 18px;
    padding: 10px;
    margin: 10px;
    background: papayawhip;
    border: 1px solid palevioletred;
    border-radius: 3px;
    ::placeholder {
      color: grey;
    }
  `;
  const TextArea = styled.textarea`
    width: 80%;
    font-size: 18px;
    padding: 10px;
    margin: 10px;
    background: papayawhip;
    border: 1px solid palevioletred;
    border-radius: 3px;
    ::placeholder {
      color: grey;
    }
  `;
  const Button = styled.button`
    color: palevioletred;
    font-size: 20px;
    margin: 10px;
    padding: 5px 20px;
    border: 2px solid palevioletred;
    border-radius: 3px;

    :hover {
      cursor: pointer;
      box-shadow: 0 0 4px palevioletred;
    }
  `;
//Component for create a new post
function CreatePost() {
  //event handler button to create a new post
  const HandleCreatePost = () => {
    let title = document.getElementById('title');
    let content = document.getElementById('content');
    let data = {
      title: title.value,
      body: content.value,
    };
    if (!data.title || !data.body) {
      alert('Enter Data');
      return;
    }
    //Axios function for create post
    createPost(data).then((res) => {
      if (res.status === 201) {
        alert('Post is created');
        title.value = content.value = '';
      } else {
        alert('Server Error');
      }
    });
  }

  return (
    <Wrapper>
      <h1>Create new post</h1>
      <PostBlock>
        <HeadText>Title</HeadText>
        <Input id="title" placeholder="Enter title"/>
        <HeadText>Content</HeadText>
        <TextArea id="content" placeholder="Enter content"/>
        <Button onClick={HandleCreatePost}>Create a post</Button>
      </PostBlock>
      <Link  className="link" to="/">Return to list of posts</Link>
    </Wrapper>
  )
}

export default CreatePost;