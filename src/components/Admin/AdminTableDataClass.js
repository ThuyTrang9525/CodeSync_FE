import { useState, useEffect } from "react";
import {
  fetchClasses,
  updateClass,
  deleteClass,
  createClass,
  fetchTeachers,
} from "../../service/api";

const colors = {
  primary: "#009688",
  primaryDark: "#00796b",
  accent: "#00bfa5",
  white: "#fff",
  grayLight: "#f9f9f9",
  gray: "#e0e0e0",
  grayDark: "#ccc",
  red: "#e74c3c",
  blue: "#3498db",
  black: "#333",
};

const styles = {
  container: { padding: "24px", fontFamily: "'Poppins', sans-serif" },
  header: { fontSize: "32px", fontWeight: "700", color: colors.black },
  border: {
    width: "150%",
    height: "2px",
    backgroundColor: "#009688",
    marginBottom: "20px",
    borderRadius: "1px",
  },
  addButton: {
    background: colors.primaryDark,
    color: colors.white,
    padding: "10px 22px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    margin: "20px 0",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px" },
  td: { padding: "12px" },
  actionButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  paginationWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
    gap: "10px",
    
  },
  paginationButton: (disabled = false, active = false) => ({
    padding: "10px 20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: disabled
      ? "#eee"
      : active
      ? colors.primary
      : "#fff",
    color: active ? "#fff" : "#000",
    cursor: disabled ? "not-allowed" : "pointer",
  }),
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalForm: {
    background: colors.white,
    borderRadius: "20px",
    padding: "40px",
    width: "480px",
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)",
  },
  formGroup: { marginBottom: "20px" },
  label: { fontWeight: 600, display: "block", marginBottom: "8px" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: `1px solid ${colors.grayDark}`,
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: `1px solid ${colors.grayDark}`,
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    background: colors.gray,
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  submitButton: {
    background: colors.primary,
    color: colors.white,
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

const ClassTable = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ className: "", userID: "" });

  const classesPerPage = 5;

  useEffect(() => {
    loadClasses();
    loadTeachers();
  }, []);

  const loadClasses = async () => {
    try {
      const res = await fetchClasses();
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  const loadTeachers = async () => {
    try {
      const res = await fetchTeachers();
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  const handleAddClick = () => {
    setFormData({ className: "", userID: "" });
    setEditingClass(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (classItem) => {
    setEditingClass(classItem);
    setFormData({
      className: classItem.className || "",
      userID: classItem.userID || "",
    });
    setIsEditing(true);
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
    try {
      if (isEditing && editingClass?.classID) {
        await updateClass(editingClass.classID, {
          className: formData.className,
          userID: formData.userID,
        });
      } else {
        await createClass({
          className: formData.className,
          userID: formData.userID,
        });
      }

      setShowModal(false);
      loadClasses();
    } catch (err) {
      console.error("Error saving class:", err.response?.data || err.message);
    }
  };

  const indexOfLast = currentPage * classesPerPage;
  const indexOfFirst = indexOfLast - classesPerPage;
  const currentClasses = classes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(classes.length / classesPerPage);

  return (
    <div style={styles.container}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={styles.header}>Class Management</h2>
          <div style={styles.border}></div>
        </div>
        <button onClick={handleAddClick} style={styles.addButton}>
        <i className="fa-solid fa-user-plus" style={{ marginRight: "6px" }}></i>
          Add Class
        </button>
    </div>
      

      <table style={styles.table}>
        <thead style={{ backgroundColor: colors.blue, color: colors.white }}>
          <tr>
            <th style={styles.th}>Class Name</th>
            <th style={styles.th}>Main Teacher</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentClasses.map((item) => (
            <tr
              key={item.classID}
              style={{ borderBottom: `1px solid ${colors.grayDark}` }}
            >
              <td style={styles.td}>{item.className}</td>
              <td style={styles.td}>{item.user?.name || "Chưa gán"}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handleEditClick(item)}
                  style={{
                    ...styles.actionButton,
                    backgroundColor: colors.primaryDark,
                    color: colors.white,
                    marginRight: "6px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.classID)}
                  style={{
                    ...styles.actionButton,
                    backgroundColor: colors.red,
                    color: colors.white,
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={styles.paginationWrapper}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={styles.paginationButton(currentPage === 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={styles.paginationButton(false, currentPage === page)}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={styles.paginationButton(currentPage === totalPages)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <form onSubmit={handleSubmit} style={styles.modalForm}>
            <div style={styles.formGroup}>
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

            <div style={styles.formGroup}>
              <label style={styles.label}>Assign Teacher</label>
              <select
                name="userID"
                value={formData.userID}
                onChange={handleInputChange}
                required
                style={styles.select}
              >
                <option value="">-- Select Teacher --</option>
                {teachers.map((teacher) => (
                  <option key={teacher.userID} value={teacher.userID}>
                    {teacher.user.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.modalActions}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
              <button type="submit" style={styles.submitButton}>
                {isEditing ? "Save Changes" : "Add Class"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClassTable;
