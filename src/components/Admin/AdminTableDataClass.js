import { useState } from "react"

const UserTableWithEdit = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, classname: "PNV", mainteacher: "Doan Minh Hoang", NumberOfClass: "Student" },
    { id: 2, classname: "PNV", mainteacher: "trang-nguyen@gmail.com", NumberOfClass: "Teacher" },
    { id: 3, classname: "PNV", mainteacher: "Doan Minh Hoang", NumberOfClass: "Student" },
    { id: 4, classname: "PNV", mainteacher: "Doan Minh Hoang", NumberOfClass: "Student" },
    { id: 5, classname: "PNV", mainteacher: "Doan Minh Hoang", NumberOfClass: "Student" },
    { id: 6, classname: "PNV", mainteacher: "Doan Minh Hoang", NumberOfClass: "Student" },
    { id: 7, classname: "PNV", mainteacher: "Doan Minh Hoang", NumberOfClass: "Student" },
  ])

  // State for modal
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Student",
  })

  // Handle edit button click
  const handleEditClick = (user) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      password: "", // Password field starts empty for security
      role: user.role,
    })
    setShowModal(true)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Update the user in the users array
    const updatedUsers = users.map((user) => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          email: formData.email,
          role: formData.role,
          // Note: In a real app, you would handle password updates differently
        }
      }
      return user
    })

    setUsers(updatedUsers)
    setShowModal(false)
  }

  // Close the modal
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {/* User Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#3498db', color: 'white' }}>
              <th style={{ width: '130px', padding: '12px', textAlign: 'left' }}>Class Name</th>
                <th style={{ width: '300px', padding: '12px', textAlign: 'left' }}>Main Teacher</th>
                <th style={{ width: '100px', padding: '12px', textAlign: 'left' }}>Number of class</th>
                <th style={{ width: '160px', padding: '12px', textAlign: 'left' }}>Actions</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>{user.classname}</td>
                <td style={{ padding: '12px' }}>{user.mainteacher}</td>
                <td style={{ padding: '12px' }}>{user.NumberOfClass}</td>
                <td style={{ padding: '12px' }}>
                <button style={{ ...buttonStyles, color: 'white' }}>
                    Watch
                  </button>
                  <button onClick={() => handleEditClick(user)} style={buttonStyles}>
                    Edit
                  </button>
                  <button style={{ ...buttonStyles, color: 'white' }}>
                    Delete
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div style={modalOverlayStyles}>
          {/* Modal Content */}
          <div style={modalContentStyles}>
            <h2 style={modalHeaderStyles}>Edit User</h2>

            <form onSubmit={handleSubmit}>
              <div style={inputGroupStyles}>
                <label htmlFor="email" style={labelStyles}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyles}
                  required
                />
              </div>

              <div style={inputGroupStyles}>
                <label htmlFor="password" style={labelStyles}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={inputStyles}
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div style={inputGroupStyles}>
                <label htmlFor="role" style={labelStyles}>
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={selectStyles}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>

              <div style={buttonContainerStyles}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={cancelButtonStyles}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={saveButtonStyles}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const buttonStyles = {
  backgroundColor: '#0F7268',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '8px',
}

const modalOverlayStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: '1000',
}

const modalContentStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '400px',
  zIndex: '1001',
}

const modalHeaderStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '16px',
}

const inputGroupStyles = {
  marginBottom: '16px',
}

const labelStyles = {
  display: 'block',
  color: '#333',
  marginBottom: '8px',
}

const inputStyles = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  fontSize: '14px',
}

const selectStyles = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  fontSize: '14px',
}

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const cancelButtonStyles = {
  backgroundColor: '#0F7268',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}

const saveButtonStyles = {
  backgroundColor: '#2ecc71',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}

export default UserTableWithEdit
