var css = document.querySelector(".copy-color");
var body = document.querySelector(".gradient");
var colorPicker = document.querySelector(".color-picker");

colorPicker.addEventListener("input", setGradient);
css.addEventListener("click", copyToClipboard);
css.addEventListener("mouseout", resetTooltip);
window.onload = setGradient();

function setGradient() {
  body.style.background =
    "linear-gradient(to right, " +
    colorPicker.firstElementChild.value +
    ", " +
    colorPicker.lastElementChild.value +
    ")";
  css.value = body.style.background + ";";
}

function copyToClipboard() {
  css.select();
  css.setSelectionRange(0, css.value.length);
  document.execCommand("copy");

  var tooltip = document.querySelector("#myTooltip");
  tooltip.textContent = "Copied";
}

function resetTooltip() {
  var tooltip = document.querySelector("#myTooltip");
  tooltip.textContent = "Copy to clipboard";
}
