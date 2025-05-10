import Logo from "../assets/image/Logo.jpg";
import '../assets/css/global.css';

export default function Footer() {
  return (
    <footer className="bg-light text-dark pt-5 pb-4 border-top shadow-sm">
      <div className="container">
        <div className="row gy-4 align-items-start">

          {/* Logo và mô tả */}
          <div className="col-md-4 text-center text-md-start">
            <img
              src={Logo}
              alt="TrackSmart Logo"
              className="mb-3"
              style={{ width: "120px", borderRadius: "10px" }}
            />
            <p className="text-muted small">
              Simplify your academic journey with <strong>TrackSmart</strong>. Stay organized, meet deadlines, and achieve your goals effortlessly.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div className="col-md-4 text-center text-md-start">
            <h6 className="mb-3 fw-semibold">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small hover-text-dark">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small hover-text-dark">Features</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted small hover-text-dark">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-muted small hover-text-dark">Contact</a>
              </li>
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="mb-3 fw-semibold">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              {["facebook", "twitter", "instagram", "linkedin"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white shadow-sm"
                  style={{ width: "36px", height: "36px" }}
                >
                  <i className={`bi bi-${platform} text-dark`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bản quyền */}
        <div className="text-center small text-muted">
          © {new Date().getFullYear()} <strong>TrackSmart</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
