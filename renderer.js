/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

/**
 *  main screen version picker
 */
let UsernameDisplay = document.getElementById("UserDisplayName");
let regbutton = document.getElementById("RegButton");
var inputValue = document.getElementById("username-input").value;
let Installation = false;
let InstallationPopUp = document.getElementById("InstPicker");
function ToggleInstallationMenu() {
  if (!Installation) {
    console.log("open");
    document.getElementById("vershow").style.transform = "rotate(-90deg)";
    InstallationPopUp.style.display = "flex";
    Installation = true;
  } else {
    console.log("closed");
    Installation = false;
    document.getElementById("vershow").style.transform = "rotate(90deg)";
    InstallationPopUp.style.display = "none";
  }
}
document
  .getElementById("versionp")
  .addEventListener("click", ToggleInstallationMenu);
function RegCheckProceed() {
  var inputValue = document.getElementById("username-input").value;
  if (inputValue.trim() !== "") {
    // Use trim() to remove leading and trailing whitespaces
    document.getElementById("registerScreen").style.display = "none";
    location.reload();
  } else {
    alert("Input field is empty!");
  }
}

regbutton.addEventListener("click", RegCheckProceed);

/**
 *
 */
