import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

Modal.setAppElement("#root");

export default function EditProfileModal({ isOpen, onRequestClose, userID }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [bio, setBio] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setDateOfBirth("");
    setGender("Male");
    setAddress("");
    setPhoneNumber("");
    setAvatarURL("");
    setEnrollmentDate("");
    setBio("");
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      axios
        .get("http://127.0.0.1:8000/api/student/profile") // Gọi GET không truyền userID
        .then((response) => {
          const data = response.data;
          setName(data.name || "");
          setEmail(data.email || "");
          setDateOfBirth(data.student?.dateOfBirth || "");
          setGender(data.student?.gender || "Male");
          setAddress(data.student?.address || "");
          setPhoneNumber(data.student?.phoneNumber || "");
          setAvatarURL(data.student?.avatarURL || "");
          setEnrollmentDate(data.student?.enrollmentDate || "");
          setBio(data.student?.bio || "");
        })
        .catch((error) => {
          alert("Lấy dữ liệu thất bại: " + error.message);
          resetForm();
        })
        .finally(() => setLoading(false));
    } else {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfile = {
      name,
      email,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      avatarURL,
      enrollmentDate,
      bio,
    };

    if (!userID) {
      alert("UserID không tồn tại, không thể cập nhật profile");
      return;
    }

    setSaving(true);
    axios
      .post(`http://127.0.0.1:8000/api/student/profile/${userID}`, updatedProfile)
      .then(() => {
        alert("Cập nhật thành công");
        onRequestClose();
      })
      .catch((error) => {
        alert("Cập nhật thất bại: " + error.message);
      })
      .finally(() => setSaving(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => !saving && onRequestClose()}
      contentLabel="Edit Profile"
      style={{ content: styles.modalContent, overlay: styles.modalOverlay }}
    >
      <h2 style={styles.modalTitle}>Edit Profile</h2>
      <div style={styles.modalIcon}>
        <FaUserCircle size={50} />
      </div>
      <div style={styles.modalDivider} />

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <form style={styles.modalForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            style={styles.modalInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
            required
          />
          <input
            type="email"
            placeholder="Email"
            style={styles.modalInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={saving}
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            style={styles.modalInput}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            disabled={saving}
          />
          <select
            style={styles.modalInput}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={saving}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Address"
            style={styles.modalInput}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={saving}
          />
          <input
            type="text"
            placeholder="Phone Number"
            style={styles.modalInput}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={saving}
          />
          <input
            type="text"
            placeholder="Avatar URL"
            style={styles.modalInput}
            value={avatarURL}
            onChange={(e) => setAvatarURL(e.target.value)}
            disabled={saving}
          />
          <input
            type="date"
            placeholder="Enrollment Date"
            style={styles.modalInput}
            value={enrollmentDate}
            onChange={(e) => setEnrollmentDate(e.target.value)}
            disabled={saving}
          />
          <textarea
            placeholder="Bio"
            style={styles.modalInput}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={saving}
          />
          <div style={styles.modalButtonGroup}>
            <button
              type="button"
              onClick={onRequestClose}
              style={{ ...styles.modalButton, ...styles.cancelButton }}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ ...styles.modalButton, ...styles.saveButton }}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

const styles = {
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    margin: "auto",
    outline: "none",
    position: "relative",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  modalIcon: {
    textAlign: "center",
    fontSize: "40px",
    color: "#009688",
  },
  modalDivider: {
    height: "1px",
    backgroundColor: "#ccc",
    margin: "10px 0",
  },
  modalForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  modalInput: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  modalButtonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  modalButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#009688",
    color: "#fff",
  },
};
