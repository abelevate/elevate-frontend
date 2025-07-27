chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message in background script:", request);

  if (request.action === "autofill") {
    // Inject content script FIRST before sending message
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["content.js"]
    }).then(() => {
      // Now send the message after successful injection
      chrome.tabs.sendMessage(sender.tab.id, { action: "autofill" });
    }).catch(error => {
      console.error("Script injection failed:", error);
    });
  }
  return true; // Keep message channel open
});

// Keep existing onInstalled and storage listeners
chrome.runtime.onInstalled.addListener(() => {
  console.log("🎉 Chrome Extension Installed Successfully!");
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") {
    console.log("🔄 Storage Updated:", changes);
  }
});