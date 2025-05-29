import { useState, useEffect } from 'react';
import EditProfileModal from '../../components/Student/StudentEditProfileModal';
import UploadProfileModal from '../../components/Student/StudentUploadAchievementsModal';
import {updateUserProfile } from '../../service/api';
import axios from 'axios';
export default function Profile() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState([]);


  const userID = localStorage.getItem('userID');

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const certRes = await axios.get('http://127.0.0.1:8000/api/student/certificates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCertificates(certRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://127.0.0.1:8000/api/student/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setLoading(false);
    }
  };

  fetchProfile();
}, []);


  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const res = await updateUserProfile(userID, updatedProfile);
      setProfile(res.data);
      setEditModalOpen(false);
      alert('Cập nhật hồ sơ thành công!');
    } catch (err) {
      alert('Cập nhật thất bại: ' + (err.response?.data?.message || 'Lỗi không xác định'));
    }
  };

  

  if (loading) return <div>Đang tải...</div>;
  if (!profile) return <div>Không tìm thấy hồ sơ.</div>;

 

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileHeader}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            <div style={styles.avatarInner}>
              <svg className="avatar-icon" viewBox="0 0 100 100" width="70" height="70">
                <circle cx="50" cy="50" r="50" fill="#009688" />
                <circle cx="50" cy="38" r="18" fill="#fff" />
                <ellipse cx="50" cy="72" rx="28" ry="18" fill="#fff" />
              </svg>
            </div>
          </div>
          <div>
            <h2 style={styles.userName}>{profile.name}</h2>
            <p style={styles.userEmail}>{profile.email}</p>

          </div>
        </div>
        <button
          style={styles.editProfileBtn}
          onClick={() => setEditModalOpen(true)}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#00796B')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#009688')}
        >
          Edit Profile
        </button>
      </div>

      <div style={styles.profileMain}>
        <div style={styles.profileLeft}>
          <h1 style={styles.profileTitle}>My Profile</h1>
          
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Date of Birth:</strong> {profile.student?.dateOfBirth}</p>
            <p><strong>Gender:</strong> {profile.student?.gender}</p>
            <p><strong>Address:</strong> {profile.student?.address}</p>
            <p><strong>Phone Number:</strong> {profile.student?.phoneNumber}</p>
            <p><strong>Enrollment Date:</strong> {profile.student?.enrollmentDate}</p>
            <p><strong>Bio:</strong> {profile.student?.bio}</p>

        </div>

        <div style={styles.profileRight}>
          <div style={styles.achievementsHeader}>
            <div style={styles.achievementsTitle}>
              <span style={styles.trophyIcon}>🏆</span>
              <h2>Achievements</h2>
            </div>
            <button
              style={styles.uploadBtn}
              onClick={() => setUploadModalOpen(true)}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#388E3C')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = '#4CAF50')}
            >
              Upload achievement
            </button>
          </div>

          <p>Congratulations on completing this challenge!</p>

          <div style={styles.certificatesGrid}>
            {certificates.map(cert => (
            <div style={styles.certificateCard} key={cert.certificateID}>
              <div>
                <img
                  src={cert.fileURL || '/placeholder.svg'}
                  alt={cert.title}
                  style={styles.achievementImg}
                />
              </div>
              <div>
                <h3 style={styles.certificateTitle}>{cert.title}</h3>
                <p style={styles.certificateDescription}>{cert.description}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        profile={profile}
        onSave={handleProfileUpdate}
      />
      <UploadProfileModal
        isOpen={uploadModalOpen}
        onRequestClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
}
 const styles = {
    profileContainer: {
      padding: 20,
      maxWidth: 1200,
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    profileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
      borderBottom: '1px solid #ddd',
      paddingBottom: 20,
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      marginRight: 16,
    },
    avatarInner: {
      width: 70,
      height: 70,
    },
    userName: {
      fontSize: 24,
      margin: 0,
    },
    userEmail: {
      fontSize: 14,
      color: 'gray',
      marginTop: 4,
    },
    editProfileBtn: {
      padding: '8px 16px',
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    editProfileBtnHover: {
      backgroundColor: '#00796B',
    },
    profileMain: {
      display: 'flex',
      gap: 40,
      flexWrap: 'wrap',
    },
    profileLeft: {
      flex: 1,
      minWidth: 280,
      backgroundColor: '#f9f9f9',
      padding: 20,
      borderRadius: 12,
      boxSizing: 'border-box',
    },
    profileRight: {
      flex: 2,
      minWidth: 300,
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 12,
      boxSizing: 'border-box',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
    },
    profileTitle: {
      marginBottom: 16,
    },
    achievementsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    achievementsTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    trophyIcon: {
      fontSize: 24,
    },
    uploadBtn: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: 6,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    certificatesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 16,
      marginTop: 20,
    },
    certificateCard: {
      backgroundColor: '#f5f5f5',
      padding: 16,
      borderRadius: 10,
      textAlign: 'center',
      boxSizing: 'border-box',
    },
    achievementImg: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: 8,
    },
    certificateTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 12,
    },
    certificateDescription: {
      fontSize: 14,
      color: '#555',
    },
  };