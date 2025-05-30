import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function UploadAchievementsModal({ isOpen, onRequestClose }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Upload Achievements"
      style={{ content: styles.modal, overlay: styles.overlay }}
    >
      <h2 style={styles.title}>Upload Achievements</h2>
      <div style={styles.divider} />
      <div style={styles.iconWrapper}>
        <span role="img" aria-label="trophy" style={styles.icon}>🏆</span>
      </div>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="achievementName" style={styles.label}>Name of achievement</label>
          <input
            type="text"
            id="achievementName"
            placeholder="Enter achievement name"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            id="description"
            placeholder="Enter description"
            style={styles.textarea}
          ></textarea>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="fileUpload" style={styles.label}>Image / PDF / Document</label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={onRequestClose}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={styles.saveButton}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', sans-serif",
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  },
  divider: {
    height: '1px',
    backgroundColor: '#ccc',
    marginBottom: '20px',
  },
  iconWrapper: {
    textAlign: 'center',
    fontSize: '40px',
    marginBottom: '20px',
  },
  icon: {
    fontSize: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
  },
  textarea: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
