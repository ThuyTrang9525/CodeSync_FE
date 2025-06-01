import Logo from "../assets/image/Logo.jpg";
import "../assets/css/Global.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Logo + Social */}
        <div className="footer-brand">
          <img src={Logo} alt="Logo" className="footer-logo" />
          <p className="footer-slogan">Worth doing, worth TrackSmart.</p>
          <div className="footer-socials">
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-pinterest"></i></a>
            <a href="#"><i className="bi bi-youtube"></i></a>
          </div>
        </div>

        {/* Navigation columns */}
        <div className="footer-links">
          <div>
            <h6>Home</h6>
            <ul>
              <li><a href="#">Colour</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Inspiration</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Professional</a></li>
            </ul>
          </div>
          <div>
            <h6>Services</h6>
            <ul>
              <li><a href="#">Find a Painter</a></li>
              <li><a href="#">Find a Store</a></li>
              <li><a href="#">TrackSmart Designers</a></li>
              <li><a href="#">Help & Advice</a></li>
            </ul>
          </div>
          <div>
            <h6>About TrackSmart</h6>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Manage My Account</a></li>
              <li><a href="#">News & Media</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Accuracy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <a href="#">Shipping & Returns</a>
          <a href="#">Careers</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Corporate Info</a>
          <a href="#">Recommended Sites</a>
          <a href="#">News & Media</a>
          <a href="#">Site Terms</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} TrackSmart</p>
      </div>
    </footer>
  );
}
