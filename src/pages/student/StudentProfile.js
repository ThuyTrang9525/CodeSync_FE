import { useState } from 'react';
import EditProfileModal from '../../components/Student/StudentEditProfileModal';
import UploadProfileModal from '../../components/Student/StudentUploadAchievementsModal';
import '../../assets/css/StudentProfile.css';
import "../../assets/css/StudentEditProfile.css";
import "../../assets/css/StudentUploadAchivement.css";
export default function Profile() {
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [uploadModalOpen, setUploadModalOpen] = useState(false)
    const certificates = [
        {
            id: 1,
            title: "Certificate Google AI Essentials",
            description:
                'Certificate of completion for the "Google AI Essentials" course awarded to Nguyen Thi Ha Sang on April 15, 2023 through Coursera, verifying foundational knowledge in Artificial Intelligence.',
            imageUrl: "https://fagopet.vn/storage/8p/hw/8phwlfug4xt1aa568qdmadttvcz2_gia-meo-anh-long-dai-trang-1.webp",
        },
        {
            id: 2,
            title: "Microsoft Azure Fundamentals",
            description:
                'Certificate of completion for the "Microsoft Azure Fundamentals" course awarded to Nguyen Thi Ha Sang on June 10, 2023, validating essential skills in cloud computing and Microsoft Azure services.',
            imageUrl: "https://fagopet.vn/storage/8p/hw/8phwlfug4xt1aa568qdmadttvcz2_gia-meo-anh-long-dai-trang-1.webp",
        },
        {
            id: 3,
            title: "AWS Cloud Practitioner",
            description:
                'Certificate of completion for the "AWS Cloud Practitioner" certification earned by Nguyen Thi Ha Sang on August 22, 2023, demonstrating comprehensive understanding of AWS cloud infrastructure and services.',
            imageUrl: "https://fagopet.vn/storage/8p/hw/8phwlfug4xt1aa568qdmadttvcz2_gia-meo-anh-long-dai-trang-1.webp",
        },
    ]


    const onClickEditProfile = () => {
        setEditModalOpen(true)
    }


    const onClickUploadProfile = () => {
        setUploadModalOpen(true)
    }

    return (
        <div className="profile-container">
            {/* Header Section */}
            <div className="profile-header">
                <div className="user-info">
                    <div className="avatar">
                        <div className="avatar-inner">
                            <div className="avatar-icon">👤</div>
                        </div>
                    </div>
                    <div className="user-details">
                        <h2 className="user-name">Nguyễn Văn A</h2>
                        <p className="user-email">Anguyen@gmail.com</p>
                    </div>
                </div>
                <button onClick={onClickEditProfile} className="edit-profile-btn">
                    Edit Profile
                </button>
            </div>


            {/* Profile Content */}
            <div className="profile-content">
                <h1 className="section-title">My Profile</h1>


                <div className="achievements-section">
                    <div className="achievements-header">
                        <div className="achievements-title">
                            <span className="trophy-icon">🏆</span>
                            <h2>Achievements</h2>
                        </div>
                        <button onClick={onClickUploadProfile} className="upload-btn">
                            Upload achievement
                        </button>
                    </div>


                    <p className="congrats-text">Congratulations on completing this challenge!</p>


                    <div className="certificates-grid">
                        {certificates.map((cert) => (
                            <div className="certificate-card" key={cert.id}>
                                <div className="certificate-image">
                                    <img src={cert.imageUrl || "/placeholder.svg"} alt={cert.title} className="achievement-img" />
                                </div>
                                <div className="certificate-content">
                                    <h3 className="certificate-title">{cert.title}</h3>
                                    <p className="certificate-description">{cert.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <EditProfileModal isOpen={editModalOpen} onRequestClose={() => setEditModalOpen(false)} />
            <UploadProfileModal isOpen={uploadModalOpen} onRequestClose={() => setUploadModalOpen(false)} />
        </div>
    )
}