import { useState, useEffect } from "react";
import axios from "axios";
import RoleFilter from "./AdminRoleFilter"; // Import component lọc
import { fetchUsers, updateUser, deleteUser } from "../../service/api";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredRole, setFilteredRole] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
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
      await deleteUser(userID);
      loadUsers();
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

      await updateUser(editingUser.userID, payload);
      setShowModal(false);
      loadUsers();
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error.response?.data || error.message);
    }
  };

  // ...phần còn lại giữ nguyên...

  const closeModal = () => setShowModal(false);

  const filteredUsers = users.filter((user) => {
    if (filteredRole === "all") return true;
    return user.role === filteredRole;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
              <th style={{width:'65px',padding:"12px",textAlign:'left'}}>Role</th>
              <th style={{width:'35px',padding:"12px",textAlign:'left'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.userID} style={styles.tableRow}>
                <td style={styles.tableCell}>{user.name}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>{user.role}</td>
                <td style={styles.tableCell1}>
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

        <div style={styles.pagination}>
          <button
            onClick={handlePrevPage}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === 1 ? "#ffffff" : "#04756a",
              color: currentPage === 1 ? "#aaa" : "#fff",
            }}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              style={{
                ...styles.pageButton,
                backgroundColor: currentPage === index + 1 ? "#04756a" : "#fff",
                color: currentPage === index + 1 ? "#fff" : "#333",
              }}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === totalPages ? "#fff" : "#04756a",
              color: currentPage === totalPages ? "#aaa" : "#fff",
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
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
  container: {
    padding: "20px",
  },
  header: {
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
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
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
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "12px",
  },
  tableCell1: {
    padding: "12px",
    textAlign: "center",
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
  // Cập nhật phần modalOverlay và modalContent trong styles của "edit"
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
  transition: "opacity 0.3s ease",
},

modalContent: {
  background: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: "48px 40px 36px",
  width: "520px",
  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)",
  fontFamily: "'Poppins', sans-serif",
  position: "relative",
  animation: "fadeInScale 0.35s ease forwards",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  textAlign: "center",
},

  inputGroup: {
    // marginBottom: "15px",
    display: "grid",
    gridTemplateColumns: "70px 850px", // First column is 30px, second takes up the remaining space
    gap: "10px", // Adds space between grid items
  },
 label: {
    fontWeight: "bold", // Để label đậm
    fontSize: "16px", // Kích thước phông chữ
    color: "#333", // Màu sắc của văn bản
    display: "flex", // Sử dụng flex để căn giữa nội dung
    justifyContent: "center", // Căn giữa nội dung theo chiều ngang
    alignItems: "center", // Căn giữa nội dung theo chiều dọc
    height: "100%", // Đảm bảo chiều cao của label bằng với container
  },
  input: {
  width: "40%",
  padding: "14px",
  marginBottom: "18px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  outline: "none",
  backgroundColor: "#f9f9f9",
  transition: "all 0.3s ease",
},

cancelButton: {
  background: "#e0e0e0",
  color: "#333",
  padding: "12px 24px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "500",
  fontSize: "15px",
  cursor: "pointer",
  transition: "background 0.3s ease",
},

saveButton: {
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
buttonContainer:{
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  marginBottom: "20px",
  gap: "10px",
},

  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  pageButton: {
    backgroundColor: "#fff",
    color: "#3498db",
    border: "1px solid #009688",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default UserTable;
