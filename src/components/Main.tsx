import React from 'react';
import { Link } from 'react-router-dom';


const Main: React.FC = () => {
  
  return (
    <div className="form">
      <p>Main Page</p>
      <div><Link to="/addPost">Add a post</Link></div>
      <div><Link to="/posts">All posts</Link></div>
    </div>
  );
};

export default Main;


