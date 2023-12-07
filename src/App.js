import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./components/Post";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Search from "./components/Search";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPage, setShowPage] = useState("home");
  const [editModalShow, setEditModalShow] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get("https://mernstack-back-v8a5.onrender.com/citybook")
      .then((response) => {
        setPosts(response.data);
        setFilteredPosts(response.data); // Initialize filteredPosts
      })
      .catch((error) => console.error(error));
  };

  const handleCreate = (newPost) => {
    axios
      .post("https://mernstack-back-v8a5.onrender.com/citybook", newPost)
      .then(() => {
        getPosts();
        setShowPage("posts");
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (updatedPost) => {
    axios
      .put(
        `https://mernstack-back-v8a5.onrender.com/citybook/${updatedPost._id}`,
        updatedPost
      )
      .then(() => {
        getPosts();
        setEditModalShow(false);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (postId) => {
    axios
      .delete(`https://mernstack-back-v8a5.onrender.com/citybook/${postId}`)
      .then(() => {
        getPosts();
      })
      .catch((error) => console.error(error));
  };

  const openEditModal = (post) => {
    setSelectedPost(post);
    setEditModalShow(true);
  };

  const closeEditModal = () => {
    setEditModalShow(false);
    setSelectedPost(null);
  };

  const onSearchChange = (searchInput) => {
    setIsSearching(searchInput.length > 0);
    const searchInputLower = searchInput.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.post.toLowerCase().includes(searchInputLower) ||
        post.location.toLowerCase().includes(searchInputLower)
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <button onClick={() => setShowPage("home")}>Home</button>
        <button onClick={() => setShowPage("add")}>Add Post</button>
        <button onClick={() => setShowPage("posts")}>Posts</button>
        <Search onSearchChange={onSearchChange} />
      </nav>

      {showPage === "home" && (
        <div className="home-page">
          <video width="300rem" height="400rem" muted autoPlay loop>
            <source src="./T.mp4" type="video/mp4" />
          </video>
          <h1>City Book</h1>
        </div>
      )}

      {showPage === "add" && <Add handleCreate={handleCreate} />}

      {showPage === "posts" && (
        <div className="posts-page">
          {(isSearching ? filteredPosts : posts).map((post) => (
            <div key={post._id} className="post-container">
              <Post post={post} />
              <div className="post-actions">
                <button onClick={() => openEditModal(post)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editModalShow && (
        <Edit
          show={editModalShow}
          handleClose={closeEditModal}
          postToEdit={selectedPost}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default App;
