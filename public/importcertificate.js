const dropArea = document.getElementById('drop-area');
const fileInfo = document.getElementById('file-info');
const errorMessage = document.getElementById('error-message');
const fileInput = document.getElementById('file-input');

// Clicking on drop area triggers file input click
dropArea2.addEventListener('click', () => {
  fileInput2.click();
});

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea2.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when a file is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea2.addEventListener(eventName, highlight, false);
});

// Unhighlight drop area when a file is dragged away
['dragleave', 'drop'].forEach(eventName => {
  dropArea2.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea2.addEventListener('drop', handleDrop, false);

// Handle file input change
fileInput2.addEventListener('change', handlefileInput2, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  dropArea2.classList.add('highlight');
}

function unhighlight() {
  dropArea2.classList.remove('highlight');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

function handlefileInput2() {
  const files = fileInput2.files;

  handleFiles(files);
}

function handleFiles(files) {
  if (files.length > 0) {
    const fileName = files[0].name;
    if (fileName.endsWith('.png')) {
      fileInfo2.innerHTML = `Selected ${fileName}`;
      errorMessage2.innerHTML = ''; // Clear error message
    }
    if (fileName.endsWith('.jpg')) {
        fileInfo2.innerHTML = `Selected ${fileName}`;
        errorMessage2.innerHTML = ''; // Clear error message
      }
      if (fileName.endsWith('.svg')) {
        fileInfo2.innerHTML = `Selected ${fileName}`;
        errorMessage2.innerHTML = ''; // Clear error message
      }
     else {
      fileInfo2.innerHTML = 'Click or Drop your CSV file Here';
      errorMessage2.innerHTML = 'Error: Please select a CSV file.';
    }
  } else {
    fileInfo2.innerHTML = 'Click or Drop your CSV file Here';
    errorMessage2.innerHTML = ''; // Clear error message
  }
}