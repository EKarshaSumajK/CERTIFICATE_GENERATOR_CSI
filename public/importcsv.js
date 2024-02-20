const dropArea = document.getElementById('drop-area');
const fileInfo = document.getElementById('file-info');
const errorMessage = document.getElementById('error-message');
const fileInput = document.getElementById('file-input');

// Clicking on drop area triggers file input click
dropArea.addEventListener('click', () => {
  fileInput.click();
});

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when a file is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

// Unhighlight drop area when a file is dragged away
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Handle file input change
fileInput.addEventListener('change', handleFileInput, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  dropArea.classList.add('highlight');
}

function unhighlight() {
  dropArea.classList.remove('highlight');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

function handleFileInput() {
  const files = fileInput.files;

  handleFiles(files);
}

function handleFiles(files) {
  if (files.length > 0) {
    const fileName = files[0].name;
    if (fileName.endsWith('.csv')) {
      fileInfo.innerHTML = `Selected ${fileName}`;
      errorMessage.innerHTML = ''; // Clear error message
    } else {
      fileInfo.innerHTML = 'Click or Drop your CSV file Here';
      errorMessage.innerHTML = 'Error: Please select a CSV file.';
    }
  } else {
    fileInfo.innerHTML = 'Click or Drop your CSV file Here';
    errorMessage.innerHTML = ''; // Clear error message
  }
}