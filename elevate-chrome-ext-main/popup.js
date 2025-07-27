let loadingSection; // Declare loadingSection outside

document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup Loaded");

  const loginForm = document.getElementById("login-form");
  const autofillButton = document.getElementById("autofill-button");
  const logoutButton = document.getElementById("logout-button");
  loadingSection = document.getElementById("loading-section"); // Initialize loadingSection here
  let userId; // Variable to store user ID

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin); // Use the new handleLogin function
  }

  if (autofillButton) {
    autofillButton.addEventListener("click", () => {
      console.log("⏳ Autofill Button Clicked");
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "autofill" });
      });
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      console.log("🔴 Logging Out...");
      chrome.storage.sync.remove(["loggedIn", "userData"], () => {
        console.log("✅ Logged Out and Cleared Storage");
        document.getElementById("login-section").style.display = "block";
        document.getElementById("autofill-section").style.display = "none";
      });
    });
  }

  chrome.storage.sync.get("loggedIn", (data) => {
    if (data.loggedIn) {
      console.log("✅ User Already Logged In");
      document.getElementById("login-section").style.display = "none";
      document.getElementById("autofill-section").style.display = "block";
    }
  });
});

async function handleLogin(e) {
  e.preventDefault();
  loadingSection.style.display = "block"; // Show loading section
  const email = document.getElementById("username").value; // Assuming username is used as email
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://elevatebackend-l9r9.onrender.com/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) throw new Error("Invalid Credentials! Please try again.");

    const result = await response.json();
    userId = result.userId; // Store user ID for later use
    console.log(userId);
    alert("Login Successful!");
    chrome.storage.sync.set({ loggedIn: true, userId }, () => {
      console.log("✅ Logged In Successfully");
      fetchUserData();
    });
  } catch (error) {
    console.error("❌ Error during login:", error);
    alert(error.message || "Login failed. Please try again.");
  } finally {
    loadingSection.style.display = "none"; // Hide loading section
  }
}

function fetchUserData() {
  console.log("�� Fetching User Data...");
  fetch(`https://elevatebackend-l9r9.onrender.com/api/users/${userId}/formDetails`)
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        chrome.storage.sync.set({ userData: data[0] }, () => {
          console.log("✅ User Data Stored:", data[0]);
          document.getElementById("loading-section").style.display = "none";
          document.getElementById("autofill-section").style.display = "block";
          alert("User data saved locally!");
        });
      } else {
        console.warn("⚠️ No user data found in API response.");
        alert("No user data found in API response.");
      }
    })
    .catch(error => {
      console.error("❌ Error Fetching User Data:", error);
      alert("Failed to load data");
    });
}