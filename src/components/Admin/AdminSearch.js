"use client"

import { useState } from "react"

const SearchForm = ({
  placeholder = "Search...",
  buttonText = "Search",
  showSearchIcon = true,
  className = "",
  initialValue = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue)
  const [results, setResults] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return

    setLoading(true)
    setError("")
    setShowModal(true)

    try {
      const res = await fetch("http://127.0.0.1:8000/api/users")
      const data = await res.json()

      const filtered = data.filter((user) =>
        user.name?.toLowerCase().includes(query.toLowerCase())
      )

      setResults(filtered)
    } catch (err) {
      console.error("Fetch error:", err)
      setError("An error occurred while fetching data.")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSearchQuery("")
    setResults(null)
    setShowModal(false)
    setError("")
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={className} style={styles.form}>
        <div style={styles.wrapper}>
          <div style={styles.inputContainer}>
            {showSearchIcon && (
              <div style={styles.iconWrapper}>
                <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            )}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholder}
              style={{ ...styles.input, paddingLeft: showSearchIcon ? "32px" : "12px" }}
            />
            {searchQuery && (
              <button type="button" onClick={handleClear} style={styles.clearBtn}>
                <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <button type="submit" style={styles.submitBtn}>{buttonText}</button>
        </div>
      </form>

      {showModal && (
        <div style={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: "10px" }}>Search Results</h3>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : results && results.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {results.map((user, idx) => (
                  <div key={idx} style={styles.profileCard}>
                    {user.avatar && (
                      <img src={user.avatar} alt={user.name} style={styles.avatar} />
                    )}
                    <div style={styles.profileInfo}>
                      <h4 style={{ margin: "0 0 6px 0" }}>{user.name || "No name"}</h4>
                      {user.email && <p><strong>Email:</strong> {user.email}</p>}
                      {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                      {user.address && <p><strong>Address:</strong> {user.address}</p>}
                      {user.role && <p><strong>Role:</strong> {user.role}</p>}
                      {user.created_at && (
                        <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button style={styles.closeBtn} onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  form: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    display: "flex",
    maxWidth: "500px",
    width: "100%",
    borderRadius: "50px",
    overflow: "hidden",
    border: "1px solid #ccc",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
  },
  inputContainer: {
    position: "relative",
    flexGrow: 1,
  },
  iconWrapper: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  icon: {
    width: "16px",
    height: "16px",
    color: "#999",
  },
  input: {
    width: "100%",
    padding: "10px 40px 10px 36px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "transparent",
    color: "#333",
    transition: "background-color 0.3s ease",
    "&:focus": {
      backgroundColor: "#fff",
    },
  },
  clearBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#aaa",
    fontSize: "14px",
    transition: "color 0.2s",
    "&:hover": {
      color: "#e74c3c",
    },
  },
  submitBtn: {
    backgroundColor: "#009688",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "0 50px 50px 0",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#00796b",
      transform: "scale(1.05)",
    },
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "24px",
    borderRadius: "12px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease-in-out",
  },
  closeBtn: {
    marginTop: "12px",
    padding: "8px 16px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#c0392b",
    },
  },
  profileCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    },
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #009688",
    boxShadow: "0 0 6px rgba(0, 150, 136, 0.3)",
  },
  profileInfo: {
    flex: 1,
    color: "#333",
  },
};


export default SearchForm
