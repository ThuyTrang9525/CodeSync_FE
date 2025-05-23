import { useState, useEffect } from "react";
import axios from "axios";
import { fetchClasses, updateClass, deleteClass } from "../../service/api";

const ClassTable = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 5;

  const [formData, setFormData] = useState({
    className: "",
    name: "",
    quantity: "",
  });

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const res = await fetchClasses();
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  const handleEditClick = (classItem) => {
    setEditingClass(classItem);
    setFormData({
      className: classItem.className || "",
      name: classItem.name || "",
      quantity: classItem.numStudents?.toString() || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá lớp học này?")) return;
    try {
      await deleteClass(id);
      loadClasses();
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingClass?.classID) return;

    try {
      const payload = {
        ...formData,
        quantity: formData.quantity === "" ? null : Number(formData.quantity),
      };

      await updateClass(editingClass.classID, payload);
      setShowModal(false);
      loadClasses();
    } catch (err) {
      console.error("Error updating class:", err.response?.data || err.message);
    }
  };

  // ...phần còn lại giữ nguyên...
  // Pagination logic
  const indexOfLast = currentPage * classesPerPage;
  const indexOfFirst = indexOfLast - classesPerPage;
  const currentClasses = classes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(classes.length / classesPerPage);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Class Management</div>
          <div style={styles.border}></div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th>Class Name</th>
              <th>Main Teacher</th>
              <th>Number of Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClasses.map((item) => (
              <tr key={item.classID} style={styles.tableRow}>
                <td>{item.className}</td>
                <td>{item.user?.name}</td>
                <td>{item.numStudents ?? 0}</td>
                <td>
                  <button onClick={() => handleEditClick(item)} style={styles.editButton}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button onClick={() => handleDelete(item.classID)} style={styles.deleteButton}>
                    <i className="fa-solid fa-user-minus"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={
              currentPage === 1 ? styles.disabledBtn : styles.pageButton
            }
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              style={
                currentPage === idx + 1
                  ? styles.activePage
                  : styles.pageButton
              }
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={
              currentPage === totalPages
                ? styles.disabledBtn
                : styles.pageButton
            }
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Edit Class</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Class Name</label>
                <input
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Teacher</label>
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
                <label style={styles.label}>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Optional"
                  style={styles.input}
                  min="0"
                />
              </div>

              <div style={styles.buttonContainer}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={styles.cancelButton}
                >
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

const styles = {
  container: {
    padding: "20px",
  },
  header: {
    marginTop: "20px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  },
  border: {
    width: "40%",
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
  tableRow: {
    borderBottom: "1px solid #ddd",
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
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    gap: "10px",
    alignItems: "center",
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "14px",
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
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
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
    color: "#009688",
    border: "1px solid #009688",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  activePage: {
    backgroundColor: "#009688",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "4px",
    cursor: "default",
    fontSize: "16px",
  },
  disabledBtn: {
    backgroundColor: "#f0f0f0",
    color: "#ccc",
    border: "1px solid #ddd",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "4px",
    cursor: "not-allowed",
    fontSize: "16px",
  },
};

export default ClassTable;
