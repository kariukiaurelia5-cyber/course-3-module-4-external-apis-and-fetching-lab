// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// DOM elements
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessageDiv = document.getElementById("error-message");

/**
 * Fetch weather alerts for a given US state
 */
function fetchWeatherAlerts(state) {
  // Input validation
  if (!state || !/^[A-Z]{2}$/.test(state)) {
    displayError("Please enter a valid two-letter state code");
    return;
  }

  fetch(`${weatherApi}${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather alerts");
      }
      return response.json();
    })
    .then(data => {
      displayAlerts(data);
    })
    .catch(error => {
      displayError(error.message);
    });
}

/**
 * Display alerts on the page
 */
function displayAlerts(data) {
  // Clear previous alerts
  alertsDisplay.innerHTML = "";

  // Hide and clear error message
  errorMessageDiv.textContent = "";
  errorMessageDiv.classList.add("hidden");

  const alertCount = data.features.length;

  // Summary title
  const summary = document.createElement("h2");
  summary.textContent = `${data.title}: ${alertCount}`;
  alertsDisplay.appendChild(summary);

  // Alert list
  const ul = document.createElement("ul");

  data.features.forEach(feature => {
    const li = document.createElement("li");
    li.textContent = feature.properties.headline;
    ul.appendChild(li);
  });

  alertsDisplay.appendChild(ul);
}

/**
 * Display error message
 */
function displayError(message) {
  alertsDisplay.innerHTML = "";
  errorMessageDiv.textContent = message;
  errorMessageDiv.classList.remove("hidden");
}

// Button click handler
fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();

  fetchWeatherAlerts(state);

  // Clear input after click
  stateInput.value = "";
});

// Export functions for Jest testing
module.exports = {
  fetchWeatherAlerts,
  displayAlerts,
  displayError
};