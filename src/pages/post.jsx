import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import shortid from 'shortid';

import { getPost, updatePost, createComment } from '../requests';

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
  `;
  const PostBlock = styled.div`
    width: 800px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
  `;
  const SectionAddComment = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 800px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
  `;
  const PostId = styled.h5`
    margin: 0;
  `;
  const Span = styled.span`
    padding: 5px 10px;
  `;
  const Button = styled.button`
    color: palevioletred;
    font-size: 20px;
    margin: 10px;
    margin-bottom: 50px;
    padding: 5px 20px;
    border: 2px solid palevioletred;
    border-radius: 3px;

    :hover {
      cursor: pointer;
      box-shadow: 0 0 4px palevioletred;
    }

    .link {
      text-decoration: none;
    }
  `;
  const ButtonAddComment = styled.button`
    display: block;
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

    .link {
      text-decoration: none;
    }
  `;
  const HeadText = styled.h4`
    margin: 0;
  `;
  const Input = styled.input`
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
    font-size: 18px;
    padding: 10px;
    margin: 10px;
    width: 30%;
    background: papayawhip;
    border: 1px solid palevioletred;
    border-radius: 3px;
    ::placeholder {
      color: grey;
    }
  `;

function Post() {
  //For getting params of request
  let { postId } = useParams();

  const [post, setPost] = useState();

  const HandleUpdatePost = () => {
    let newTitle = document.getElementById('newTitle');
    let newContent = document.getElementById('newContent');
    let data = {
      title: newTitle.value,
      body: newContent.value,
    };
    if (!data.title || !data.body) {
      alert('Enter Data');
      return;
    }
    updatePost(postId, data).then((res) => {
      if (res.status === 200) {
        getPost(postId).then(data => {
          setPost(data);
        });
      } else {
        alert('Server Error');
      }
    });
  }

  const HandleAddComment = () => {
    let newComment = document.getElementById('newComment');
    let data = {
      postId: Number(postId),
      body: newComment.value,
    }
    if (!data.postId || !data.body) {
      alert('Enter Data');
      return;
    }
    createComment(data).then((res) => {
      if (res.status === 201) {
        getPost(postId).then(data => {
          newComment.value = '';
          setPost(data);
        });
      } else {
        alert('Server Error');
      }
    });
  }

  useEffect(() => {
    getPost(postId).then(data => {
      setPost(data);
    });
  },[]);

  return (
    <Wrapper>
      <h1>Page of Post</h1>
      {
        !post ?
        <h1>Error server</h1> :
        <PostBlock>
          <PostId>{post.id}</PostId>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <hr/>
          <h5>Comments:</h5>
          <ul>
            {
              post.comments.map((comment) => 
                <li key={shortid()}>
                  <Span>{comment.id}</Span>
                  <Span>{comment.body}</Span>
                </li>
              )
            }
          </ul>
        </PostBlock>
      }
      <SectionAddComment>
        <TextArea id="newComment" placeholder="Enter comment"/>
        <ButtonAddComment onClick={HandleAddComment}>Add comment</ButtonAddComment>
      </SectionAddComment>
      <Button onClick={HandleUpdatePost}>Update post</Button>
      <HeadText>New title</HeadText>
      <Input id="newTitle" placeholder="Enter title"/>
      <HeadText>New content</HeadText>
      <TextArea id="newContent" placeholder="Enter content"/>
      <Link className="link" to="/">
        Return to list of posts
      </Link>
    </Wrapper>
  );
}

export default Post;