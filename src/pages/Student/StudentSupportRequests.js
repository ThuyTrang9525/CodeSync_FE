import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Navbar from '../../components/Student/StudentNavBar';
import studyImg from '../../assets/image/study.png';
import '../../assets/css/StudentRequestSupport.css';
import { getAllSubject, sendSupportRequest } from '../../service/api';

const SupportRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('Admin');
  const [classID, setClassID] = useState('');
  const [classList, setClassList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchClassesWithTeachers = async () => {
      try {
        const response = await getAllSubject();
        setClassList(response.data);
        if (response.data.length > 0) {
          setClassID(response.data[0].classID);
        }
      } catch (error) {
        console.error('Error fetching class list:', error);
      }
    };

    fetchClassesWithTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const selectedClass = classList.find(cls => cls.classID === parseInt(classID));

    if (role === 'Teacher' && (!selectedClass || !selectedClass.teacherID)) {
      setErrorMessage('❌ This class does not have an assigned teacher. Request cannot be submitted.');
      return;
    }

    const recipientId = role === 'Admin' ? null : selectedClass?.teacherID;

    const requestData = {
      title,
      description,
      recipientId,
    };

    try {
      const response = await sendSupportRequest(requestData);
      if (response.status === 201) {
        setSubmitted(true);
        setTitle('');
        setDescription('');
        setRole('Admin');
        setClassID(classList[0]?.classID || '');
      } else {
        alert('An error occurred while submitting the request.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server connection failed.');
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="support-container">
        <div className="support-image">
          <img src={studyImg} alt="Student studying" />
        </div>
        <div className="support-form">
          <h2>📞 Support Request</h2>
          <form onSubmit={handleSubmit}>
            <label>👥 Who do you want to contact?</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
            </select>

            {role === 'Teacher' && (
              <>
                <label>📚 Subject (Class):</label>
                <select value={classID} onChange={(e) => setClassID(e.target.value)}>
                  {classList.map(cls => (
                    <option key={cls.classID} value={cls.classID}>
                      {cls.className}
                    </option>
                  ))}
                </select>

                <label>👨‍🏫 Assigned Teacher:</label>
                <div className="teacher-name-display">
                  {
                    classList.find(cls => cls.classID === parseInt(classID))?.teacherName
                    || <span style={{ color: 'red' }}>No teacher assigned</span>
                  }
                </div>
              </>
            )}

            <label>📝 Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter request title"
              required
            />

            <label>🗒 Description:</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail"
              required
            ></textarea>

            {errorMessage && (
              <div style={{ color: 'red', marginBottom: '12px' }}>
                {errorMessage}
              </div>
            )}

            <button type="submit" disabled={!!errorMessage}>
              🚀 Submit Request
            </button>

            {submitted && (
              <div className="success-message">
                ✅ Your request has been submitted successfully!
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupportRequestForm;
