import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users";

const UserTableWithEdit = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy user:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user); // set selected user for editing
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "STUDENT",
    });
    setShowModal(true);
  };

  const handleDelete = async (userID) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá user này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${userID}`);
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Lỗi khi xoá user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!editingUser || !editingUser.userID) {
    console.error("Editing user or userID is missing.");
    return;
  }

  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      ...(formData.password && { password: formData.password }),
    };

    console.log("Sending payload:", payload);

    await axios.put(`${API_URL}/${editingUser.userID}`, payload);
    setShowModal(false);
    fetchUsers(); // Refresh user list after update
  } catch (error) {
    console.error("Lỗi khi cập nhật user:", error.response?.data || error.message);
  }
};

  const closeModal = () => setShowModal(false);

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#3498db", color: "white" }}>
              <th style={{ width: "220px", padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ width: "220px", padding: "12px", textAlign: "left" }}>Email</th>
              <th style={{ width: "50px", padding: "12px", textAlign: "left" }}>Role</th>
              <th style={{ width: "50px", padding: "12px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userID} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleEditClick(user)} style={buttonStyles}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.userID)} style={deleteButtonStyles}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlayStyles}>
          <div style={modalContentStyles}>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div style={inputGroupStyles}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={inputStyles}
                />
              </div>
              <div style={inputGroupStyles}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={inputStyles}
                />
              </div>
              <div style={inputGroupStyles}>
                <label>Password (optional)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={inputStyles}
                />
              </div>
              <div style={inputGroupStyles}>
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={inputStyles}
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="TEACHER">TEACHER</option>
                </select>
              </div>
              <div style={buttonContainerStyles}>
                <button type="button" onClick={closeModal} style={cancelButtonStyles}>
                  Cancel
                </button>
                <button type="submit" style={saveButtonStyles}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const tdStyle = { padding: "12px" };
const buttonStyles = {
  backgroundColor: "#0F7268",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "8px",
};
const deleteButtonStyles = {
  backgroundColor: "#e74c3c",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const modalOverlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
};
const modalContentStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  zIndex: 1001,
};
const inputGroupStyles = { marginBottom: "16px" };
const inputStyles = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ddd",
};
const buttonContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
};
const cancelButtonStyles = {
  backgroundColor: "#999",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
const saveButtonStyles = {
  backgroundColor: "#2ecc71",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default UserTableWithEdit;
