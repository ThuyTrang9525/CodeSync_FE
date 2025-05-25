import React, { useState } from "react";
import { addUser } from "../../service/api"; // Thay đổi đường dẫn nếu cần

const AdminButtonAddProps = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Không mặc định, bắt buộc chọn
  });

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data on Submit: ", formData);

            const data = await addUser(formData);

      console.log("User added successfully:", data);
      alert("User added successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "", // Reset lại role về trống
      });
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error: Unable to add user.");
    }
  };

  return (
    <>
      <div style={styles.addBtnWrapper}>
        <button onClick={handleOpen} style={styles.addBtn}>
          <i className="fa-solid fa-user-plus" style={{ marginRight: "6px" }}></i>
          Add User
        </button>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{ marginBottom: "20px" }}>Add New User</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="" disabled>
                  -- Select role --
                </option>
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
              </select>

              <div style={styles.modalButtons}>
                <button type="submit" style={styles.submitBtn}>Add</button>
                <button type="button" onClick={handleClose} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  addBtnWrapper: {
    display: "flex", 
    justifyContent: "flex-end",
    marginTop: "20px",  
  },

  addBtn: {
    marginTop: "20px",
    backgroundColor: "#00796b",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.45)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    transition: "opacity 0.3s ease"
  },
  modalContent: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "48px 40px 36px",
    width: "520px", // To hơn
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    animation: "fadeInScale 0.35s ease forwards",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    textAlign: "center"
  },

  heading: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "24px",
    color: "#333"
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "#f9f9f9",
    transition: "all 0.3s ease",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "14px",
    marginTop: "10px"
  },
  submitBtn: {
    background: "linear-gradient(135deg, #00bfa5, #00796b)",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  cancelBtn: {
    background: "#e0e0e0",
    color: "#333",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  }
};

export default AdminButtonAddProps;
