import {useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';
import Parse from 'parse';
import './Home.css'
import {useParseQuery} from '@parse/react';


export default function Home() {
  const [postText, setPostText] = useState('');
  const history = useHistory();
  
  const parseQuery = new Parse.Query('Post');
  parseQuery.descending("createdAt");

  useEffect(() => {
    async function checkUser() {
      const currentUser = await Parse.User.currentAsync();
      if (!currentUser) {
        alert('You need to be logged in to access this page');
        history.push("/auth");
      }
    }
    checkUser();
  }, []);
  

  const {
    isLive,
    isLoading,
    isSyncing,
    results,
    count,
    error,
    reload
  } = useParseQuery(
    parseQuery
  );

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const Post = Parse.Object.extend("Post");
    const newPost = new Post();
    newPost.save({
      text: postText,
      authorName: Parse.User.current().get('username'),
    });
    setPostText("");
  };
  
  return (
    <div className="App">
      <header className="app-header">
      <img className="logo" alt="back4app's logo" src={'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png'} />
        <h2 className="spacing">parse hooks</h2>
        <span>social network</span>
      </header>
      
      <div className="posts-container">
      <form onSubmit={handleSubmitPost}className="actions">
        <textarea value={postText} onChange={event => setPostText(event.currentTarget.value)}/>
        <button type="submit">post</button>
      </form>


      <div className="post-list">
        {results && results.map((user,index) => (
        <div className="post" key={index}>
          <span>{user.get('authorName')}</span>
          <p>{user.get('text')}</p>
        </div>))}
      </div>
      </div>
    </div>
  );
}