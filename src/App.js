import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from "styled-components";

import Posts from './pages/posts.jsx';
import Post from './pages/post.jsx';
import CreatePost from './pages/create-post.jsx'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route path="/post/:postId" component={Post} />
        <Route path="/create" component={CreatePost} />
      </Switch>
    </Router>
  );
}

export default App;
