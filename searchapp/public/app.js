const uploadForm = document.getElementById('upload-form');
const message = document.getElementById('message');

uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(uploadForm);
  
  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  
  message.textContent = data.message;
});

const searchForm = document.getElementById('search-form');
const resultsList = document.getElementById('results-list');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const query = document.getElementById('query').value;
  
  const response = await fetch(`/search?q=${query}`);
  
  const results = await response.json();
  
  resultsList.innerHTML = '';
  
  results.forEach((result) => {
    const listItem = document.createElement('li');
    
    const fileName = document.createElement('span');
    fileName.textContent = result.name;
    listItem.appendChild(fileName);
    
    const lineNumber = document.createElement('span');
    lineNumber.textContent = `Line ${result.lineNumber}: `;
    listItem.appendChild(lineNumber);
    
    const content = document.createElement('span');
    content.textContent = result.content;
    listItem.appendChild(content);
    
    const highlightedContent = document.createElement('span');
    highlightedContent.innerHTML = content.innerHTML.replace(new RegExp(query, 'gi'), '<span class="highlight">$&</span>');
    listItem.replaceChild(highlightedContent, content);
    
    resultsList.appendChild(listItem);
  });
});
