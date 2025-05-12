import { useState, useEffect } from "react";
import axios from "axios";
import RoleFilter from "./AdminRoleFilter"; // Import component lọc

const API_URL = "http://127.0.0.1:8000/api/users";

const UserTableWithEdit = () => {
  const [users, setUsers] = useState([]);
  const [filteredRole, setFilteredRole] = useState("all");
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
    setEditingUser(user);
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
      fetchUsers();
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

      await axios.put(`${API_URL}/${editingUser.userID}`, payload);
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error.response?.data || error.message);
    }
  };

  const closeModal = () => setShowModal(false);

  const filteredUsers = users.filter((user) => {
    if (filteredRole === "all") return true;
    return user.role === filteredRole;
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>User Management</div>
          <div style={styles.border}></div>
        </div>

        <div style={styles.filterContainer}>
          <RoleFilter onFilterChange={setFilteredRole} />
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={{width:'220px',padding:"12px",textAlign:'left'}}>Name</th>
              <th style={{width:'220px',padding:"12px",textAlign:'left'}}>Email</th>
              <th style={{width:'50px',padding:"12px",textAlign:'left'}}>Role</th>
              <th style={{width:'50px',padding:"12px",textAlign:'left'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.userID} style={styles.tableRow}>
                <td style={styles.tableCell}>{user.name}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>{user.role}</td>
                <td style={styles.tableCell}>
                  <button onClick={() => handleEditClick(user)} style={styles.editButton}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button onClick={() => handleDelete(user.userID)} style={styles.deleteButton}>
                    <i className="fa-solid fa-user-minus"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Password (optional)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={styles.input}
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="TEACHER">TEACHER</option>
                </select>
              </div>
              <div style={styles.buttonContainer}>
                <button type="button" onClick={closeModal} style={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" style={styles.saveButton}>
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
const styles = {
filterContainer: {
  display: "flex",
  justifyContent: "center",
  margin: "20px 0"
},
header:{
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",              
},
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  },
  border: {
    width: "150%",
    height: "2px",
    backgroundColor: "#009688",
    marginBottom: "20px",
    borderRadius: "1px",
  },

  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#3498db",
    color: "white",
  },
  tableHeaderCell: {
    padding: "12px",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "12px",
  },
  editButton: {
    backgroundColor: "#0F7268",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
};

export default UserTableWithEdit;
