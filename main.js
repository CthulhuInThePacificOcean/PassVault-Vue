const closeButton = document.querySelector('#close-button');
const newFileBox = document.querySelector('#box-1');
const fileButton = document.querySelector('#new-folder-button');
const fileForm = document.querySelector('#fileForm');
const createFileBtn = document.querySelector('#createFolder');
const fileList = document.querySelector('#file-list');
const input = document.querySelector('#file-name');
const tabs = document.querySelectorAll('.tabs');
const flex2 = document.querySelector('#box-2');

const daFiles = [{ title: 'Default', content: 'Placeholder' }];

closeButton.addEventListener('click', () => {
  newFileBox.style.display = 'none';
});

fileButton.addEventListener('click', () => {
  newFileBox.style.display = 'block';
});

function createFile(tab) {
  const file = document.createElement('li');
  file.textContent = tab.title;

  const fileContent = document.createElement('div');
  fileContent.textContent = tab.content;

  file.addEventListener('click', () => {
    const tabHeaderItems = fileList.querySelectorAll('li');
    tabHeaderItems.forEach((item) => {
      item.classList.remove('active-tab');
    });

    const fileContentItems = flex2.querySelectorAll('div');
    fileContentItems.forEach((item) => {
      item.classList.remove('active-tab');
    });

    file.classList.add('active-tab');

    const index = Array.from(fileList.children).indexOf(file);
    const fileContent = flex2.children[index];

    fileContent.classList.add('active-tab');
  });

  fileList.appendChild(file);
  flex2.appendChild(fileContent);
}

daFiles.forEach((tab) => {
  createFile(tab);
});

const firstTabHeaderItem = fileList.querySelector('li');
const firstTabContentItem = flex2.querySelector('div');
firstTabHeaderItem.classList.add('active-tab');
firstTabContentItem.classList.add('active-tab');

createFileBtn.addEventListener('click', () => {
  const newTabTitle = input.value;

  if (newTabTitle) {
    const newTabContent = newTabTitle; // Assign an empty string as the initial content for the new tab
    const newTab = { title: newTabTitle, content: newTabContent };
    daFiles.push(newTab);
    createFile(newTab);

    input.value = ''; // Clear the input field after creating a new tab
  }
});