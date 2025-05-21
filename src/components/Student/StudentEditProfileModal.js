import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaUserCircle } from "react-icons/fa";

Modal.setAppElement("#root");

export default function EditProfileModal({ isOpen, onRequestClose, profile, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPhoneNumber(profile.phoneNumber || "");
      setPassword("");
    }
  }, [profile, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name,
      email,
      phoneNumber,
    };

    if (password.trim() !== "") {
      updatedData.password = password;
    }

    onSave(updatedData);
  };

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
        <FaUserCircle className="profile-icon" />
      </div>
      <div className="modal-divider"></div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          className="modal-input"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="modal-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="modal-input"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (leave blank to keep current)"
          className="modal-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="modal-button-group">
          <button
            type="button"
            onClick={onRequestClose}
            className="modal-button modal-button-cancel"
          >
            Cancel
          </button>
          <button type="submit" className="modal-button modal-button-save">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}