import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Navbar from '../../components/Student/StudentNavBar';
import StudentHomeContent from '../../components/Student/StudentHomeContent';
import "../../assets/css/StudentHomepage.css";
import student1 from '../../assets/image/student1.png';
import student2 from '../../assets/image/student2.png';
import student3 from '../../assets/image/student3.png';
import student4 from '../../assets/image/student4.png';
import student5 from '../../assets/image/student5.png'; 
import student6 from '../../assets/image/student6.png';
import student7 from '../../assets/image/student7.png';
import student8 from '../../assets/image/student8.png';
import student9 from '../../assets/image/student9.png';
import student10 from '../../assets/image/student10.png';
import student11 from '../../assets/image/student11.png';
import student12 from '../../assets/image/student12.png';
import student13 from '../../assets/image/student13.png'; 
import student14 from '../../assets/image/student14.png';
import student15 from '../../assets/image/student15.png';
import student16 from '../../assets/image/student16.png';
import student17 from '../../assets/image/student17.png';
import student18 from '../../assets/image/student18.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Calendar from '../../components/Student/StudentCalendarView';

import SupportRequestFormBody from '../../components/Student/SupportRequestFormBody';

import '../../assets/css/StudentHomepage.css';

const StudentHomepage = () => {
    const images = [
    student1,
    student2,
    student3,
    student4,
    student5,
    student6,
    student7,
    student8,
    student9,
    student10,
    student11,
    student12,
    student13,
    student14,
    student15,
    student16,
    student17,
    student18
  ];
const settings = {
  dots: true,          
  infinite: true,       
  speed: 500,           
  slidesToShow: 3,      
  slidesToScroll: 1,    
  autoplay: true,      
  autoplaySpeed: 3000,  
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 }
    }
  ]
};

  return (
<div className="student-homepage bg-gradient-to-b from-white to-blue-50 min-h-screen font-sans">
  <Header />
  <Navbar />

  {/* Section: Danh sách lớp học */}
  <div className="section max-w-6xl mx-auto px-6 py-12">
    <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate-fade-in text-center">📚 Your Classes</h2>
    <StudentHomeContent />
  </div>

  {/* Section: About Us */}
  <section className="max-w-6xl mx-auto px-6 py-12" id="about">
    <h2 className="text-3xl font-bold text-blue-700 mb-6 animate-fade-in text-center">🎓 About Us</h2>

    <div className="grid md:grid-cols-2 gap-8 animate-slide-in">
      {/* Description */}
      <div className="about-description text-left">
        <p>
          We are passionate students from <strong>Passerelles Numériques Vietnam</strong>, 
          working together to grow, learn, and make an impact.
        </p>
        <p><strong>Category:</strong> Non-Governmental Organization (NGO)</p>
        <p><strong>Languages:</strong> Vietnamese & English</p>
        <p><strong>Rating:</strong> 98% recommendation (82 reviews)</p>
        <p><strong>Status:</strong> Currently closed</p>
      </div>

      {/* Contact Info */}
      <div className="contact-box text-left">
        <h3 className="text-xl font-semibold mb-3">📞 Contact Information</h3>
        <p><strong>📍 Address:</strong> 99 Tô Hiến Thành, Sơn Trà, Đà Nẵng, Vietnam, 59000</p>
        <p><strong>📱 Phone:</strong> 0236 3888 503</p>
        <p><strong>✉️ Email:</strong> <a href="mailto:info.vietnam@passerellesnumeriques.org">info.vietnam@passerellesnumeriques.org</a></p>
      </div>
    </div>
  </section>

  {/* Section: Student Life Gallery */}
  <section className="bg-white py-12" id="gallery">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-green-600 mb-8 animate-fade-in text-center">📸 Student Life</h2>
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="px-2">
            <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
              <img
                src={img}
                alt={`Student activity ${idx + 1}`}
                style={{ width: '360px', height: '400px' }}
                className="object-cover mx-auto"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </section>

  {/* Section: Contact */}
  <section className="max-w-6xl mx-auto px-6 py-12" id="contact">
    <h2 className="text-3xl font-bold text-purple-600 mb-4 animate-fade-in text-center">📬 Get in Touch</h2>
    <p className="text-gray-700 text-lg mb-6 animate-slide-in text-center">
      Want to learn more or collaborate with us? Let’s connect!
    </p>
    <div className="text-center">
      <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
        Contact Us
      </button>
    </div>
  </section>

  <Footer />
</div>

  );
};


export default StudentHomepage;
