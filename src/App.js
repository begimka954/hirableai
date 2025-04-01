import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Landing from './components/Welcome/LandingPage';
import Posts from './components/Posts/Posts';
import CreatePosts from './components/Posts/CreatePosts';
import Photos from './Photos/Photos';
import Todos from './Todos/Todos';


function App() {
  return (
    <Router>
    <nav>
      <ul style={{listStyle:'none', display:'flex', flexDirection:'row'}}>
        <li style={{paddingLeft:'8px', paddingRight:'8px', textDecoration:'none'}}>
          <Link to="/">Home</Link>
        </li>
        <li style={{paddingLeft:'8px', paddingRight:'8px', textDecoration:'none'}}>
          <Link to="/posts">Posts</Link>
        </li>
        <li style={{paddingLeft:'8px', paddingRight:'8px', textDecoration:'none'}}>
          <Link to="/create-a-new-post">Create a Posts</Link>
        </li>
        <li style={{paddingLeft:'8px', paddingRight:'8px', textDecoration:'none'}}>
          <Link to="/photos">Photos</Link>
        </li>
        <li style={{paddingLeft:'8px', paddingRight:'8px', textDecoration:'none'}}>
          <Link to="/todo">Todo</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/create-a-new-post" element={<CreatePosts/>} />
      <Route path="/photos" element={<Photos/>}/>
      <Route path="/todo" element={<Todos/>}/>
    </Routes>
  </Router>
  );
}

export default App;
