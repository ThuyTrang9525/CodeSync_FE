import React, { useState } from "react";

const AdminButtonAddProps = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT" // Đảm bảo có giá trị mặc định cho role
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
      console.log("Form Data on Submit: ", formData); // Kiểm tra dữ liệu trước khi gửi

      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const data = await response.json();
      console.log("User added successfully:", data);
      alert("User added successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "STUDENT" // Reset lại giá trị role
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
              >
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
    backgroundColor: "#009688",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modalContent: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    fontSize: "16px"
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between"
  },
  submitBtn: {
    backgroundColor: "#009688",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px"
  },
  cancelBtn: {
    backgroundColor: "#ccc",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px"
  }
};

export default AdminButtonAddProps;
