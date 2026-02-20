import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
    

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} ShopZone. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy</a>
              <span className="separator">•</span>
              <a href="#">Terms</a>
              <span className="separator">•</span>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>

    </footer>
  );
}
