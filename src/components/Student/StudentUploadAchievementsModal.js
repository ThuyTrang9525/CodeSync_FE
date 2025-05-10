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
      className="achievement-modal"
      overlayClassName="custom-overlay" // Đã đổi tên tại đây
    >
      <h2 className="modal-title">Upload Achievements</h2>
      <hr className="divider" />
      <div className="icon-wrapper">
        <span className="icon">🏆</span>
      </div>
      <form className="achievement-form">
        <div className="form-group">
          <label htmlFor="achievementName">Name of achievement</label>
          <input
            type="text"
            id="achievementName"
            placeholder="Enter achievement name"
          />
        </div>


        <div className="form-group">
          <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter description"
            ></textarea>
        </div>


        <div className="form-group">
          <label htmlFor="fileUpload">Image / PDF / Document</label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
          />
        </div>


        <div className="button-group">
          <button
            type="button"
            onClick={onRequestClose}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="save-button"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}