'use client';

import { useState, useContext } from "react";
import { UserContext } from "@/app/layout";

const LoginPopup = ({ setShowModal }) => {
  const { userId, setUserId } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://elevate-backend-qo67.onrender.com/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status !== 200) throw new Error("Invalid Credentials! Please try again.");

      const result = await response.json();
      if (result?.userId) {
        setUserId(result.userId);
        localStorage.setItem("userId", result.userId);
        console.log(result.userId);
      }

      alert("Login Successful!");
      setEmail("");
      setPassword("");
      setShowModal(false);
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://elevate-backend-qo67.onrender.com/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send reset email. Please try again.");
      }

      setResetMessage("OTP sent to your email. Please check your inbox.");
      setForgotPasswordMode(false);
      setOtpMode(true);
    } catch (error) {
      setError(error.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://elevate-backend-qo67.onrender.com/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Password reset failed. Please try again.");
      }

      const result = await response.json();
      alert(result.message || "Password reset successfully");
      
      // Reset states
      setOtpMode(false);
      setOtp("");
      setNewPassword("");
      setResetMessage("");
    } catch (error) {
      setError(error.message || "Password reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Standard login form
  if (!forgotPasswordMode && !otpMode) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            width: "300px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <button
            onClick={() => setShowModal(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#ff5a5f",
            }}
          >
            ✖
          </button>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />

            {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                opacity: isLoading ? 0.6 : 1,
                transition: "background 0.3s",
                marginBottom: "10px",
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            
            <button
              type="button"
              onClick={() => setForgotPasswordMode(true)}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                color: "#007bff",
                padding: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              Forgot Password?
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Forgot password email submission form
  if (forgotPasswordMode) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            width: "300px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <button
            onClick={() => {
              setForgotPasswordMode(false);
              setShowModal(false);
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#ff5a5f",
            }}
          >
            ✖
          </button>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />

            {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                opacity: isLoading ? 0.6 : 1,
                transition: "background 0.3s",
                marginBottom: "10px",
              }}
            >
              {isLoading ? "Submitting..." : "Send Reset OTP"}
            </button>
            
            <button
              type="button"
              onClick={() => setForgotPasswordMode(false)}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                color: "#007bff",
                padding: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // OTP verification and password reset form
  if (otpMode) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            width: "300px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <button
            onClick={() => {
              setOtpMode(false);
              setShowModal(false);
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#ff5a5f",
            }}
          >
            ✖
          </button>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Reset Password</h2>
          
          {resetMessage && (
            <p style={{ color: "green", fontSize: "14px", marginBottom: "10px" }}>{resetMessage}</p>
          )}
          
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              disabled
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
                backgroundColor: "#f5f5f5",
              }}
            />
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />

            {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                opacity: isLoading ? 0.6 : 1,
                transition: "background 0.3s",
                marginBottom: "10px",
              }}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setOtpMode(false);
                setForgotPasswordMode(false);
              }}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                color: "#007bff",
                padding: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default LoginPopup;