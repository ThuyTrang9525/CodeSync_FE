import { useState, useEffect } from "react";
import {
  fetchClasses,
  fetchTeachers,
  createClass,
  updateClass,
  deleteClass,
  fetchUnassignedStudents,
} from "../../service/api";

const ClassTable = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showClassModal, setShowClassModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ className: "", userID: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  
  // NEW: State lưu danh sách userID học sinh được chọn để assign
  const [selectedStudentsToAssign, setSelectedStudentsToAssign] = useState([]);

  const classesPerPage = 5;

  useEffect(() => {
    loadClasses();
    loadTeachers();
  }, []);

  // Fetch all classes
  const loadClasses = async () => {
    try {
      const res = await fetchClasses();
      setClasses(res.data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  // Fetch all teachers
  const loadTeachers = async () => {
    try {
      const res = await fetchTeachers();
      setTeachers(res.data);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };

  // Fetch unassigned students
const getUnassignedStudents = async () => {
  const students = await fetchUnassignedStudents();
  setUnassignedStudents(students);
};

  // Open modal to add new class
  const openAddModal = () => {
    setFormData({ className: "", userID: "" });
    setEditingClass(null);
    setIsEditing(false);
    setShowClassModal(true);
  };

  // Open modal to edit existing class
  const openEditModal = (classItem) => {
    setEditingClass(classItem);
    setFormData({
      className: classItem.className || "",
      userID: classItem.userID || "",
    });
    setIsEditing(true);
    setShowClassModal(true);
  };

  // Delete a class by ID with confirmation
  const handleDeleteClass = async (classID) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá lớp học này?")) return;
    try {
      await deleteClass(classID);
      loadClasses();
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  // Handle input changes for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form to create or update class
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && editingClass?.classID) {
        await updateClass(editingClass.classID, formData);
      } else {
        await createClass(formData);
      }
      setShowClassModal(false);
      loadClasses();
    } catch (error) {
      console.error("Error saving class:", error.response?.data || error.message);
    }
  };

  // Fetch detailed info of class including students, also fetch unassigned students
  const fetchClassDetails = async (classID) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/classmate/${classID}`);
      const data = await res.json();
      setSelectedClassDetails(data);

      // Mỗi lần mở modal xem chi tiết, load lại danh sách học sinh chưa gán
      await fetchUnassignedStudents();

      // Reset danh sách học sinh được chọn để assign
      setSelectedStudentsToAssign([]);

      setShowStudentModal(true);
    } catch (error) {
      console.error("Failed to fetch class details:", error);
    }
  };

  // Pagination logic
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const displayedClasses = classes.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(classes.length / classesPerPage);

  // NEW: Toggle chọn/bỏ chọn học sinh để assign
  const toggleSelectStudent = (userID) => {
    setSelectedStudentsToAssign((prev) =>
      prev.includes(userID)
        ? prev.filter((id) => id !== userID)
        : [...prev, userID]
    );
  };

  // NEW: Gửi request assign học sinh được chọn vào lớp
  const assignStudentsToClass = async () => {
  if (selectedStudentsToAssign.length === 0 || !selectedClassDetails) {
    alert("Please select at least one student.");
    return;
  }

  try {
    for (const studentID of selectedStudentsToAssign) {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/classes/${selectedClassDetails.class.id}/assign-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: studentID }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error assigning:", errorData.message);
        alert(`Failed to assign student ${studentID}: ${errorData.message}`);
      }
    }

    alert("Students assigned successfully!");
    fetchClassDetails(selectedClassDetails.class.classID);
    fetchUnassignedStudents();
    setSelectedStudentsToAssign([]);
  } catch (error) {
    console.error(error);
    alert("Error assigning students. Please try again.");
  }
};


  return (
    <div style={styles.container}>
      <header style={styles.headerSection}>
      <div>
          <div style={styles.title}>Class Management</div>
          <div style={styles.border}></div>
      </div>
          <button onClick={openAddModal} style={styles.addButton}>
          <i className="fa-solid fa-plus" style={{ marginRight: 6 }}></i>
          Add Class
        </button>
      </header>

      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th style={{ width: "220px", padding: "12px", textAlign: "left" }}>
              Class Name
            </th>
            <th style={{ width: "220px", padding: "12px", textAlign: "left" }}>
              Main Teacher
            </th>
            <th style={{ width: "80px", padding: "12px", textAlign: "left" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedClasses.map((cls) => (
            <tr key={cls.classID} style={styles.tableRow}>
              <td style={styles.td}>{cls.className}</td>
              <td style={styles.td}>{cls.user?.name || "Chưa gán"}</td>
              <td style={styles.td}>
                <button
                  onClick={() => openEditModal(cls)}
                  style={{ ...styles.actionButton, ...styles.editButton }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => handleDeleteClass(cls.classID)}
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                >
                  <i className="fa-solid fa-delete-left"></i>
                </button>
                <button
                  onClick={() => fetchClassDetails(cls.classID)}
                  style={{ ...styles.actionButton, ...styles.viewButton }}
                >
                  <i className="fa-solid fa-eye"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={styles.paginationWrapper}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          style={styles.paginationButton(currentPage === 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={styles.paginationButton(false, currentPage === page)}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          style={styles.paginationButton(currentPage === totalPages)}
        >
          Next
        </button>
      </div>

      {/* Modal Add/Edit Class */}
      {showClassModal && (
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
                placeholder="Class Name"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Main Teacher</label>
              <select
                name="userID"
                value={formData.userID}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Choose Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.userID} value={teacher.userID}>
                    {teacher.user.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.modalFooter}>
              <button type="submit" style={styles.submitButton}>
                {isEditing ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowClassModal(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal xem chi tiết lớp và assign học sinh */}
      {showStudentModal && selectedClassDetails && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalForm}>

            <h3 style={{ marginBottom: 12 }}>
              Class: {selectedClassDetails.class.name}
            </h3>
              <div style={{paddingBottom:'10px'}}>Main Teacher: {selectedClassDetails.mainTeacher.name}</div>
              <div style={{width: "100%", height: "2px",backgroundColor: "#009688",marginBottom: "40px",borderRadius: "1px",}}></div>

            <h4>Students in this Class</h4>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>DOB</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Address</th>
                  <th style={styles.th}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {selectedClassDetails.students && selectedClassDetails.students.length > 0 ? (
                  selectedClassDetails.students.map((student) => (
                    <tr key={student.userID} style={styles.tableRow}>
                      <td style={styles.td}>{student.userID}</td>
                      <td style={styles.td}>{student.name || "-"}</td>
                      <td style={styles.td}>{student.email || "-"}</td>
                      <td style={styles.td}>{student.dateOfBirth || "-"}</td>
                      <td style={styles.td}>{student.gender || "-"}</td>
                      <td style={styles.td}>{student.address || "-"}</td>
                      <td style={styles.td}>{student.phoneNumber || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: 12 }}>
                      No students in this class.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <h4 style={{ marginTop: 24 }}>Assign Students (Unassigned Students)</h4>
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>Select</th>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                </tr>
              </thead>
              <tbody>
                {unassignedStudents.length > 0 ? (
                  unassignedStudents.map((student) => (
                    <tr key={student.userID} style={styles.tableRow}>
                      <td style={styles.td}>
                        <input
                          type="checkbox"
                          checked={selectedStudentsToAssign.includes(student.userID)}
                          onChange={() => toggleSelectStudent(student.userID)}
                        />
                      </td>
                      <td style={styles.td}>{student.userID}</td>
                      <td style={styles.td}>{student.name || "-"}</td>
                      <td style={styles.td}>{student.email || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: 12 }}>
                      No unassigned students available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div style={{ marginTop: 12, textAlign: "right" }}>
              <button
  onClick={assignStudentsToClass}
  style={{ ...styles.submitButton, marginRight: 8 }}
>
  Assign Selected Students
</button>
              <button
                onClick={() => setShowStudentModal(false)}
                style={styles.cancelButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Colors with no duplicates and consistent naming
const colors = {
  primary: "#009688",
  primaryDark: "#004085",
  accent: "#00bfa5",
  white: "#fff",
  grayLight: "#f9f9f9",
  gray: "#e0e0e0",
  grayDark: "#ddd",
  red: "#dc3545",
  blue: "#007bff",
  black: "#333",
  green: "#28a745",
};

// Styles cleaned and grouped
const styles = {
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
  container: { padding: 24, fontFamily: "'Poppins', sans-serif" },

  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  header: { fontSize: 32, fontWeight: 700, color: colors.black },

  addButton: {
    background: colors.primary,
    color: colors.white,
    padding: "10px 22px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
  },

  table: { width: "100%", borderCollapse: "collapse" },

  tableHead: { backgroundColor: colors.blue, color: colors.white },

  th: { padding: 12, textAlign: "left" },

  td: { padding: 12 },

  tableRow: { borderBottom: `1px solid ${colors.grayDark}` },

  actionButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginRight: 6,
  },

  editButton: {
    backgroundColor: colors.primary,
    color: colors.white,
  },

  deleteButton: {
    backgroundColor: colors.red,
    color: colors.white,
  },

  viewButton: {
    backgroundColor: colors.green,
    color: colors.white,
    marginRight: 0,
  },

  paginationWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
  },

  paginationButton: (disabled = false, active = false) => ({
    padding: "10px 20px",
    borderRadius: 6,
    border: "1px solid #ccc",
    backgroundColor: disabled ? "#eee" : active ? colors.primary : "#fff",
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
    borderRadius: 20,
    padding: 40,
    width: 900,
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)",
    maxHeight: "90vh",
    overflowY: "auto",
  },

  formGroup: { marginBottom: 20 },

  label: { fontWeight: 600, display: "block", marginBottom: 8 },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: `1px solid ${colors.grayDark}`,
    fontSize: 16,
  },

  select: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: `1px solid ${colors.grayDark}`,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 20,
  },

  cancelButton: {
    backgroundColor: colors.grayLight,
    border: "none",
    borderRadius: 12,
    padding: "8px 20px",
    cursor: "pointer",
  },

  submitButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    border: "none",
    borderRadius: 12,
    padding: "8px 20px",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default ClassTable;
