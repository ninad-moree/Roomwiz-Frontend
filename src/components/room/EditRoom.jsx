import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from '../common/RoomTypeSelector';


const EditRoom = () => {
  const [room, setRoom] = useState({photo: null, roomType: "", roomPrice: ""});
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await updateRoom(roomId, room);

      if (success !== undefined) {
        setSuccessMessage("Room updated successfully");
        const updatedRoom = await getRoomById(roomId);
        setRoom(updateRoom);
        setImagePreview(updateRoom.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error in adding new room.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [roomId]);

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 justify-content-start">
            <h2 className="mt-5 mb-2" style={{ textAlign: "left" }}>Edit a Room</h2>

            {successMessage && (
              <div className="alert alert-success fade show">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">Room Type</label>

                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={room}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">Room Price</label>

                <input
                  className="form-control"
                  required
                  type="number"
                  id="roomPrice"
                  name="roomPrice"
                  value={room.roomPrice}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="photo" className="form-label">Room Photo</label>

                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="form-control mb-1"
                  onChange={handleImageChange}
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>

              <div className="d-grid d-md-flex mt-2">
                <Link to={"/existing-rooms"} className="btn btn-outline-info me-1">Back</Link>

                <button className="btn btn-outline-primary ml-5">Edit Room</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditRoom;
