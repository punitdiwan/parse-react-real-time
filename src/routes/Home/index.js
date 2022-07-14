import {useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';
import Parse from 'parse';
import './Home.css'
import {useParseQuery} from '@parse/react';


export default function Home() {
  const [todo, setTodo] = useState('');
  const history = useHistory();
  
  const parseQuery = new Parse.Query('Todo');
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

  const handleSubmitTodo = (e) => {
    e.preventDefault();
    const Todo = Parse.Object.extend("Todo");
    const newTodo = new Todo();
    newTodo.save({
      title: todo,
      completed: false
    });
    setTodo("");
  };
  
  return (
    <div className="App">
      <header className="app-header">
        <h2 className="spacing">Parse Server Sample</h2>
        <span>social network</span>
      </header>
      
      <div className="posts-container">
      <form onSubmit={handleSubmitTodo} className="actions">
        <textarea value={todo} onChange={event => setTodo(event.target.value)}/>
        <button type="submit">Post Todo</button>
      </form>


      <div className="post-list">
        {results && results.map((todo,index) => (
        <div className="post" key={index}>
          <p>{todo.get('title')}</p>
        </div>))}
      </div>
      </div>
    </div>
  );
}