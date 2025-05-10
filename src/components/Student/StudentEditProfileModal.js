import React from "react";
import Modal from "react-modal";
import { FaUserCircle } from "react-icons/fa"; // Import icon từ React Icons


Modal.setAppElement("#root");


export default function EditProfileModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Profile"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Profile Edit</h2>
      <div className="modal-icon">
        <FaUserCircle className="profile-icon" /> {/* Dùng icon React */}
      </div>
      <div className="modal-divider"></div>
      <form className="modal-form">
        <input type="text" placeholder="Student Name" className="modal-input" />
        <input type="text" placeholder="Phone Number" className="modal-input" />
        <input type="email" placeholder="Email" className="modal-input" />
        <input type="password" placeholder="Password" className="modal-input" />
        <div className="modal-button-group">
          <button
            type="button"
            onClick={onRequestClose}
            className="modal-button modal-button-cancel"
          >
            Cancel
          </button>
          <button type="button" className="modal-button modal-button-save">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}