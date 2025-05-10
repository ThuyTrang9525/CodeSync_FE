"use client"

import { useState } from "react"

const SearchForm = ({
  onSearch,
  placeholder = "Search...",
  buttonText = "Search",
  showSearchIcon = true,
  className = "",
  initialValue = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleClear = () => {
    setSearchQuery("")
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className} style={styles.form}>
      <div style={styles.wrapper}>
        <div style={styles.inputContainer}>
          {showSearchIcon && (
            <div style={styles.iconWrapper}>
              <svg
                style={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
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
            onChange={handleChange}
            placeholder={placeholder}
            style={{
              ...styles.input,
              paddingLeft: showSearchIcon ? "32px" : "12px",
            }}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              style={styles.clearBtn}
            >
              <svg
                style={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
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

        <button type="submit" style={styles.submitBtn}>
          {buttonText}
        </button>
      </div>
    </form>
  )
}

const styles = {
  form: {
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
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  inputContainer: {
    position: "relative",
    flexGrow: 1,
  },
  iconWrapper: {
    position: "absolute",
    left: "10px",
    top: "40%",
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
    padding: "10px 40px 8px 12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
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
  },
  submitBtn: {
    backgroundColor: "#009688",
    color: "white",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
}

export default SearchForm
