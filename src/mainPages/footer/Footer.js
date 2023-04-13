import React from "react";
import "./footer.css";
import logo from "../../assets/zaperon_logo/zaperon_logo.png";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p> Powered by</p> <img src={logo} alt="Logo" />
      </div>
      <div className="footer-right">
        <span>Need help?</span>
        <a href="#">
          <p>Privacy </p>
          <p className="andP">&</p>
          <p> Policy</p>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
