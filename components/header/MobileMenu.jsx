"use client"; // Ensures it's a Client Component

import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/layout";
import { User } from "lucide-react"; // Importing Avatar icon

import RegisterPopup from "../home-17/RegisterPopup";
import LoginPopup from "../home-17/LoginPopup";

const MobileMenu = () => {
  const { userId, setUserId } = useContext(UserContext);
  const [navbar, setNavbar] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Change navbar background on scroll
  useEffect(() => {
    const changeBackground = () => {
      setNavbar(window.scrollY >= 10);
    };

    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  // Retrieve userId from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [setUserId]);

  // Logout handler
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userId");
      setUserId(null);
      alert("Logged out successfully!");
    }
  };

  return (
    <header
      className="main-header main-header-mobile"
      style={{
        position: "fixed",
        width: "100%",
        top: "0",
        left: "0",
        backgroundColor: navbar ? "rgba(255, 255, 255, 0.9)" : "transparent",
        transition: "0.3s ease-in-out",
        padding: "10px 20px",
        boxShadow: navbar ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
        zIndex: 1000,
      }}
    >
      <div className="auto-container">
        <div
          className="inner-box"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="nav-outer" style={{ display: "flex", alignItems: "center" }}>
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image width={154} height={50} src="/images/elevate_logo.png" alt="brand" />
                </Link>
              </div>
            </div>

            <MobileSidebar />
          </div>

          <div
            className="outer-box"
            style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}
          >
            <div className="login-box">
              {userId ? (
                // When the user is logged in, show a logout button.
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "transparent",
                    color: "#ff5a5f",
                    border: "2px solid #ff5a5f",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#ff5a5f";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#ff5a5f";
                  }}
                >
                  Logout
                </button>
              ) : (
                // When no user is logged in, show an avatar icon
                <div
                  onClick={() => {
                    setShowRegister(true);
                    setShowLogin(false);
                  }}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#e0e0e0",
                    cursor: "pointer",
                  }}
                >
                  <User size={24} color="#555" /> {/* Avatar icon from Lucide React */}
                </div>
              )}
            </div>

            {/* Mobile menu toggler adjusted to remain on-screen */}
            <a
              href="#"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              style={{
                fontSize: "24px",
                cursor: "pointer",
                padding: "4px",
                marginLeft: "auto",
              }}
            >
              <span className="flaticon-menu-1"></span>
            </a>
          </div>
        </div>

        {/* Register and Login Popups inside login-box */}
        <div className="login-box">
          {showRegister && (
            <RegisterPopup setShowModal={setShowRegister} setShowLogin={setShowLogin} />
          )}
          {showLogin && <LoginPopup setShowModal={setShowLogin} setShowRegister={setShowRegister} />}
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
