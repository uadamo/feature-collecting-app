import React from "react";
import "./Footer.css";
import Cookies from "js-cookie";

const Footer = () => {
  const userId = Cookies.get("keystroke-auth-research-tracking");
  return (
    <div className="footer">
      {userId ? `identified user ${userId.slice(5)}` : "unidentified user"}
    </div>
  );
};

export default Footer;
