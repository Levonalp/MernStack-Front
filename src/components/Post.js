import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

const Post = (props) => {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  return (
    <>
      <div className="card text-center" style={{ width: '45rem' }}>
        <h5
          className="location-link"
          onClick={() => {
            setShowModal(!showModal)
          }}
        >
          <a href="#" onClick={handleShow}>
            <ion-icon name="location-outline"></ion-icon>
            {props.post.location}
          </a>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {' '}
              <GoogleMap zoom={7} center={{ lat: 28, lng: -81 }} mapContainerClassName="map-container"></GoogleMap>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </h5>
        <img src={props.post.img} />
        <p>{props.post.post}</p>
        <p>{props.post.date}</p>
      </div>
    </>
  )
}

export default Post
