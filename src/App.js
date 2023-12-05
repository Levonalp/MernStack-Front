import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Post from "./components/Post";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Search from "./components/Search";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// load api
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
const PORT = process.env.PORT;

const App = () => {
  const [post, setPost] = useState([]);
  const [showEdit, setShowEdit] = useState([]);

  // search
  const [isSearching, setIsSearching] = useState(false);
  const [filteredPost, setFilteredPost] = useState([]);

  // modal
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleShowEdit = () => setShowEditModal(true);
  const handleCloseEdit = () => setShowEditModal(false);

  // routes
  const getPost = () => {
    axios
      .get("https://mernstack-back-v8a5.onrender.com/" || PORT)
      .then(
        (response) => setPost(response.data),
        (err) => console.log(err)
      )
      .catch((error) => console.log(error));
  };

  const handleCreate = (data) => {
    axios
      .post("https://mernstack-back-v8a5.onrender.com/" || PORT, data)
      .then((response) => {
        console.log(response);
        getPost();
        showPostP();
      });
  };

  const handleEdit = (data) => {
    axios
      .put(
        "hhttps://mernstack-back-v8a5.onrender.com/" || PORT + data._id,
        data
      )
      .then((response) => {
        let newPost = post.map((post) => {
          return post._id !== data._id ? post : data;
        });
        setPost(newPost);
      });
  };

  const handleDelete = (deletedPost) => {
    axios
      .delete(
        "https://mernstack-back-v8a5.onrender.com/" || PORT + deletedPost._id
      )
      .then((response) => {
        getPost();
      });
  };
  // search
  // search
  // search
  // const onSearchChange = (searchInput) => {
  //   const searchInputLower = searchInput.toLowerCase()
  //   if (searchInput.length > 0) {
  //     setIsSearching(true)
  //     const result = post.filter((post) => {
  //       console.log(post.location)
  //       return (
  //         post.post.match(searchInputLower) ||
  //         post.location.match(searchInputLower) ||
  //         post.date.match(searchInputLower)
  //       )
  //     })
  //     setFilteredPost(result)
  //   } else {
  //     setIsSearching(false)
  //   }
  // }

  // search
  const onSearchChange = useCallback(
    (searchInput) => {
      const searchInputLower = searchInput.toLowerCase();
      if (searchInput.length > 0) {
        setIsSearching(true);
        const result = post.filter((post) => {
          return (
            post.location.toLowerCase().match(searchInputLower) ||
            post.post.toLowerCase().match(searchInputLower) ||
            post.date.toLowerCase().match(searchInputLower)
          );
        });
        setFilteredPost(result);
      } else {
        setIsSearching(false);
      }
    },
    [post]
  );

  const NoSearchResults = () => {
    return (
      <>
        <p className="noResults"></p>
      </>
    );
  };
  // search filtered posts
  const postToDisplay = isSearching ? filteredPost : post;

  // states to show pages
  const [show, setShow] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showHomeP, setShowHomeP] = useState(true);

  useEffect(() => {
    getPost();
  }, []);

  const showHome = () => {
    setShowHomeP(true);
    setShowPost(false);
    setShow(false);
  };
  const showPostP = () => {
    setShowHomeP(false);
    setShowPost(true);
    setShow(false);
  };
  const showAdd = () => {
    setShowHomeP(false);
    setShowPost(false);
    setShow(true);
  };

  return (
    <div className="container-fluid m-auto-0">
      <nav className="navbar navbar-expand w-100 d-flex p-3;">
        <img src="./logo.png" className="logo" />
        <Search onSearchChange={onSearchChange} />

        <button className="btn btn-light showhomebtn" onClick={showHome}>
          <ion-icon name="home"></ion-icon>
        </button>
        <button className="btn btn-light" onClick={showPostP}>
          <ion-icon name="logo-twitter"></ion-icon>
        </button>
        <button className="btn btn-light addbtn" onClick={showAdd}>
          <ion-icon name="add"></ion-icon>
        </button>
      </nav>

      {showHomeP ? (
        <div className="container-fluid">
          <video width="300rem" height="400rem" muted autoPlay loop>
            <source src="./T.mp4" type="video/mp4" />
          </video>
          <h1 className="text-center">City Book</h1>
        </div>
      ) : null}

      <div className="row posts-container text-center">
        {show ? <Add handleCreate={handleCreate} /> : null}
        {postToDisplay.map((post) => {
          return showPost ? (
            <div className="post-container m-2" key={post._id}>
              <div className="col-12 m-auto ">
                <Post post={post} />
              </div>

              <>
                <Button
                  className="m-1"
                  variant="light"
                  onClick={handleShowEdit}
                >
                  <ion-icon name="settings"></ion-icon>
                </Button>
                <Edit post={post} handleEdit={handleEdit} />

                <Modal show={showEditModal} onHide={handleCloseEdit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body></Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        handleDelete(post);
                      }}
                      value={post._id}
                    >
                      Delete
                    </button>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </div>
          ) : null;
        })}
        <NoSearchResults />
      </div>
    </div>
  );
};

export default App;
