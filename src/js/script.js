// Select DOM elements
const cssOutput = document.querySelector(".copy-color");
const body = document.querySelector(".gradient");
const colorPickers = document.querySelectorAll(".color-picker input"); // Select color picker inputs

// Attach event listeners
colorPickers.forEach((picker) => picker.addEventListener("input", setGradient));
cssOutput.addEventListener("click", copyToClipboard);
cssOutput.addEventListener("mouseout", resetTooltip);
window.addEventListener("load", setGradient);

function setGradient() {
  if (colorPickers.length < 2) {
    console.error(
      "There should be at least two color picker inputs for setting the gradient."
    );
    return;
  }

  // Set gradient based on the first two color picker values
  const color1 = colorPickers[0].value;
  const color2 = colorPickers[1].value;

  body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
  cssOutput.value = `${body.style.background};`;
}

function copyToClipboard() {
  if (!cssOutput.value) {
    console.error("Nothing to copy to clipboard.");
    return;
  }

  navigator.clipboard
    .writeText(cssOutput.value)
    .then(() => {
      const tooltip = document.querySelector("#myTooltip");
      tooltip.textContent = "Copied";
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function resetTooltip() {
  const tooltip = document.querySelector("#myTooltip");
  tooltip.textContent = "Copy to clipboard";
}
