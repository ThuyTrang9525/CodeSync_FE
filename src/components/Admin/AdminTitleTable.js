import React from "react";
// Removed unused import: import { BiBorderTop } from "react-icons/bi";

const TitleTable = ({ title, className }) => {
  return (
    <div style={styles.containerss} className={className}>
      <h2 style={styles.titless}>{title}</h2>
      <div style={styles.border}></div>
    </div>
  );
};

const styles = {
  containerss: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Left-aligned is typically better for titles
    width: "80%",
    marginTop: "20px",
  },
  titless: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 8px 0", // Add some space between title and border
  },
  border: {
    width: "50%",
    height: "2px",
    backgroundColor: "#009688", // Teal color
    borderRadius: "1px", // Slightly rounded border
  },
};

export default TitleTable;