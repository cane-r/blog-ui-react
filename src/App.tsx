import './App.css';
import { AddPost, GetPosts, Main, SinglePost,EditPost } from './components/index'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/addPost" element={<AddPost/>} />
          <Route path="/posts" element={<GetPosts/>} />
          <Route path="/posts/:id" element={<SinglePost/>} />
          <Route path="/posts/edit/:id" element={<EditPost/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
