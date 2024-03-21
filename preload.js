// preload.js
const { ipcRenderer } = require("electron");

// Initialize store only when needed
let store;
ipcRenderer.on("init-store", () => {
  const Store = require("electron-store");
  store = new Store();
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("RegButton").addEventListener("click", () => {
    const username = document.getElementById("username-input").value;
    ipcRenderer.send("save-username", username);
  });

  ipcRenderer.on("username-loaded", (event, username) => {
    if (username) {
      document.getElementById("registerScreen").style.display = "none";
      document.getElementById("UserDisplayName").textContent = username;
    } else {
      document.getElementById("registerScreen").style.display = "flex";
    }
  });

  // Request initialization of the store
  ipcRenderer.send("init-store");
});
