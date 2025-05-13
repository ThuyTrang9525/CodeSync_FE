import React from "react";

const TitleTable = ({ title, className, onClick }) => {
  return (
    <div
      style={styles.containerss}
      className={className}
      onClick={onClick}
    >
      <h2 style={styles.titless}>{title}</h2>
      <div style={styles.border}></div>
    </div>
  );
};

const styles = {
  containerss: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
    marginTop: "20px",
    cursor: "pointer", // 👉 để thấy có thể click được
  },
  titless: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 8px 0",
  },
  border: {
    width: "50%",
    height: "2px",
    backgroundColor: "#009688",
    borderRadius: "1px",
  },
};

export default TitleTable;
