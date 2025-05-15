"use client"
import { Container, Row, Col, Button, Nav, Navbar } from "react-bootstrap"
import {
  Users,
  Target,
  Shield,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Book,
  Video,
  Award,
  Clock,
} from "lucide-react"
import "../assets/css/Homepage.css"
import Header from "../components/header"
import Footer from "../components/footer"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Header />
      <div className="hero-section py-5" id="home">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center">
                <div className="avatar-circle me-4">
                  <div className="avatar-inner"></div>
                </div>
                <div>
                  <h2 className="fw-bold">Easy learning, connecting all games.</h2>
                  <p className="text-muted">
                    We help you make progress in games you already play, while creating new gaming partners. It's a
                    simple way to learn.
                  </p>
                  <div className="mt-4">
                    <Button variant="primary" className="btn-custom me-3 px-4 py-2">
                      Get Started
                    </Button>
                    <Button variant="outline-primary" className="btn-outline-custom px-4 py-2">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="success-section py-5" id="features">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title fw-bold mb-2">The Secret Behind Success</h2>
            <div className="title-underline mb-5"></div>
            <Row className="g-4">
              <Col md={4}>
                <div className="feature-card">
                  <div className="icon-circle">
                    <Users size={28} color="#009688" />
                  </div>
                  <h5 className="fw-bold mt-4">Collaboration & Support</h5>
                  <p className="text-muted">We connect players who can help each other learn and grow together.</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="feature-card">
                  <div className="icon-circle">
                    <Target size={28} color="#009688" />
                  </div>
                  <h5 className="fw-bold mt-4">Personal Growth</h5>
                  <p className="text-muted">Measure progress, identify your strengths and areas for improvement.</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="feature-card">
                  <div className="icon-circle">
                    <Shield size={28} color="#009688" />
                  </div>
                  <h5 className="fw-bold mt-4">Transparency & Security</h5>
                  <p className="text-muted">We protect your data and provide clear information about our services.</p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className="teachers-section py-5" id="teachers">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="section-title fw-bold mb-3">Teachers choose us to make a real impact.</h2>
              <p className="text-muted mb-4">
                We provide teachers an elegant tool that lets them create an interactive learning experience for their
                students.
              </p>
              <ul className="teacher-benefits">
                <li>
                  <div className="benefit-icon">
                    <Award size={18} />
                  </div>
                  <div className="benefit-text">
                    <h6 className="fw-bold mb-1">Certified Curriculum</h6>
                    <p className="text-muted mb-0">All our courses align with educational standards</p>
                  </div>
                </li>
                <li>
                  <div className="benefit-icon">
                    <Users size={18} />
                  </div>
                  <div className="benefit-text">
                    <h6 className="fw-bold mb-1">Collaborative Teaching</h6>
                    <p className="text-muted mb-0">Work with other educators to create better content</p>
                  </div>
                </li>
                <li>
                  <div className="benefit-icon">
                    <Target size={18} />
                  </div>
                  <div className="benefit-text">
                    <h6 className="fw-bold mb-1">Progress Tracking</h6>
                    <p className="text-muted mb-0">Monitor student performance with detailed analytics</p>
                  </div>
                </li>
              </ul>
              <Button variant="primary" className="btn-custom px-4 py-2 mt-3">
                Discover how <ArrowRight size={16} className="ms-2" />
              </Button>
            </Col>
            <Col md={4} className="text-center">
              <div className="image-circle">
                <div className="image-inner"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="learning-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              <div className="image-circle">
                <div className="image-inner"></div>
              </div>
            </Col>
            <Col md={8}>
              <h2 className="section-title fw-bold mb-3">Your Learning, Your Way</h2>
              <p className="text-muted mb-4">
                We give you the tools to learn effectively on your own terms. Play the way you want, with a schedule
                that works for you, and discover new ways to improve.
              </p>
              <Button variant="primary" className="btn-custom px-4 py-2">
                Start Your Learning <ArrowRight size={16} className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="testimonial-section py-5">
        <Container>
          <Row className="mb-5">
            <Col md={8} className="mx-auto">
              <div className="testimonial-card">
                <div className="quote-mark">"</div>
                <p className="testimonial-text mb-4">
                  As your teacher, my goal isn't just to help you understand the material — it's to help you discover
                  your potential, believe in your abilities, and grow into someone who learns with purpose.
                </p>
                <div className="d-flex align-items-center">
                  <div className="testimonial-avatar me-3">
                    <div className="avatar-inner"></div>
                  </div>
                  <div>
                    <p className="mb-0 fw-bold">Mr. Young</p>
                    <small className="text-muted">Teacher</small>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  )
}
