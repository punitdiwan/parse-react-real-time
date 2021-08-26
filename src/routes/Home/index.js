import './Home.css'

export default function Home() {

  const initialPosts = [{
    userName: 'User 1',
    post: "Hello, I'm super happy to be a part of this social network"
  }]
  

  return (
    <div className="App">
      <header className="app-header">
      <img className="logo" alt="back4app's logo" src={'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png'} />
        <h2 className="spacing">parse hooks</h2>
        <span>social network</span>
      </header>
      
      <div className="posts-container">
      <div className="actions">
        <textarea />
        <button>post</button>
      </div>


      <div className="post-list">
        {initialPosts && initialPosts.map(({userName, post},index) => (
        <div className="post" key={index}>
          <span>{userName}</span>
          <p>{post}</p>
        </div>))}
      </div>
      </div>
    </div>
  );
}