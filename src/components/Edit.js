import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Edit = ({ show, handleClose, postToEdit, handleEdit }) => {
  const [post, setPost] = useState({ ...postToEdit });

  useEffect(() => {
    setPost({ ...postToEdit });
  }, [postToEdit]);

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEdit(post);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            value={post.location || ""}
          />
          <br />
          <label htmlFor="post">Post: </label>
          <input
            type="text"
            name="post"
            onChange={handleChange}
            value={post.post || ""}
          />
          <br />
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={post.date || ""}
          />
          <br />
          <label htmlFor="img">Image: </label>
          <input
            type="text"
            name="img"
            onChange={handleChange}
            value={post.img || ""}
          />
          <br />
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Edit;
