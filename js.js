window.onload = function () {

  // Definitions
  var canvas = document.getElementById("paint-canvas");
  var context = canvas.getContext("2d");
  var boundings = canvas.getBoundingClientRect();


  // Specifications
  var mouseX = 0;
  var mouseY = 0;
  context.strokeStyle = 'black'; // initial brush color
  context.lineWidth = 5; // initial brush width
  var isDrawing = false;
  var brushSlider = document.getElementById('slider');


  // Handle Colors
  var colors = document.getElementsByClassName('colors')[0];

  colors.addEventListener('click', function(event) {
    var color = event.target.value || 'black'; // Get the selected color
    context.strokeStyle = color; // Set the brush color
    
    // Set the value of --SliderColor to the selected color
    brushSlider.style.setProperty('--SliderColor', color);
  });
  var colorPicker = document.getElementById('color-picker');

  colorPicker.addEventListener('change', function(event) {
    var color = event.target.value || 'black'; // Get the selected color
    context.strokeStyle = color; // Set the brush color
    
    // Set the value of --SliderColor to the selected color
    brushSlider.style.setProperty('--SliderColor', color);
  });
  // Handle Brushes

// Function to update thumb size and color
brushSlider.oninput = function() {
  var brushSize = brushSlider.value / 10; // Convert slider value to brush size (assuming each step is 0.1)
  context.lineWidth = brushSize;
  brushSlider.style.setProperty('--sliderSize', brushSize + 5 + 'px');
}

  // Mouse Down Event
 const MAIN_MOUSE_BUTTON = 0;
function mousedown(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldDraw = true;
    context.beginPath();
    let elementRect = event.target.getBoundingClientRect();
    context.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
  }
}
function mouseup(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldDraw = false;
  }
}
function mousemove(event) {
  if (shouldDraw) {
    let elementRect = event.target.getBoundingClientRect();
    context.lineTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
    context.stroke();
  }
}
canvas.addEventListener('mousedown', mousedown);
canvas.addEventListener('mouseup', mouseup);
canvas.addEventListener('mousemove', mousemove);
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;
canvas.style.width = window.innerHeight;
canvas.style.height = window.innerHeight;

  // Handle Clear Button
  var clearButton = document.getElementById('clear');

  clearButton.addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Handle Save Button
  var saveButton = document.getElementById('save');

  saveButton.addEventListener('click', function() {
    var imageName = prompt('Please enter image name');
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'drawing';
    a.click();
  });
};
