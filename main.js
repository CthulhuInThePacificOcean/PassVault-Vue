const closeButton = document.querySelector('#close-button');
const newFileBox = document.querySelector('#box-1');
const fileButton = document.querySelector('#new-folder-button');
const fileForm = document.querySelector('#fileForm');
const createFileBtn = document.querySelector('#createFolder');
const fileList = document.querySelector('#file-list');
const input = document.querySelector('#file-name');
const tabs = document.querySelectorAll('.tabs');
const flex2 = document.querySelector('#box-2');
const nameTag = document.querySelector('.name-input');
const siteTag = document.querySelector('.site-input');
const userTag = document.querySelector('.user-input');
const passTag = document.querySelector('.pass-input');
const popupBox = document.querySelector('.popup-box');
const closeIcon = document.querySelector('header i');
const addBox = popupBox.querySelector('button');

const daFiles = [{ title: 'Default', notes: [] }];
const addButtons = [];

let activeTabIndex = 0; // Track the index of the active tab
let isUpdate = false;
let updateId;

closeButton.addEventListener('click', () => {
  newFileBox.style.display = 'none';
});

closeIcon.addEventListener('click', () => {
  popupBox.classList.remove('show');
});

fileButton.addEventListener('click', () => {
  newFileBox.style.display = 'block';
});

function createFile(tab) {
  const file = document.createElement('li');
  file.classList.add('tab-title');
  file.textContent = tab.title;

  const fileContent = document.createElement('ul');
  fileContent.classList.add('tab-content');
  const addButton = document.createElement('li');
  addButton.classList.add('add-button');
  addButton.textContent = 'Add a password';

  const noteContainer = document.createElement('div');
  noteContainer.classList.add('note-container');

  fileContent.appendChild(addButton);
  fileContent.appendChild(noteContainer);
  addButtons.push(addButton);

  addButton.addEventListener('click', () => {
    nameTag.focus();
    popupBox.classList.add('show');
  });

  file.addEventListener('click', () => {
    const tabHeaderItems = fileList.querySelectorAll('.tab-title');
    tabHeaderItems.forEach((item) => {
      item.classList.remove('active-tab');
    });

    const fileContentItems = flex2.querySelectorAll('.tab-content');
    fileContentItems.forEach((item) => {
      item.classList.remove('active-tab');
    });

    file.classList.add('active-tab');

    activeTabIndex = Array.from(fileList.children).indexOf(file); // Update the activeTabIndex
    const fileContent = flex2.children[activeTabIndex];
    fileContent.classList.add('active-tab');
    showNotes(fileContent, tab);
  });

  fileList.appendChild(file);
  flex2.appendChild(fileContent);
}

daFiles.forEach((tab) => {
  createFile(tab);
});

const firstTabHeaderItem = fileList.querySelector('.tab-title');
const firstTabContentItem = flex2.querySelector('.tab-content');
firstTabHeaderItem.classList.add('active-tab');
firstTabContentItem.classList.add('active-tab');

createFileBtn.addEventListener('click', () => {
  const newTabTitle = input.value;

  if (newTabTitle) {
    const newTab = { title: newTabTitle, notes: [] };
    daFiles.push(newTab);
    createFile(newTab);

    input.value = ''; // Clear the input field after creating a new tab
  }
});

function showNotes(fileContent, tab) {
  const noteContainer = fileContent.querySelector('.note-container');
  noteContainer.innerHTML = '';

  tab.notes.forEach((note, index) => {
    const liTag = `<li class="note">
      <div class="details">
        <p>Name: ${note.name}</p>
        <p>Link: ${note.site}</p>
        <p>Username: ${note.username}</p>
        <p>Password: ${note.password}</p>
      </div>
        <div class="settings">
          <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
          <ul class="menu">
            <li onclick="updateNote(${index}, '${note.name}', '${note.site}', '${note.username}', '${note.password}')"><i class="uil uil-pen"></i>Edit</li>
            <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>    
          </ul>   
        </div> 
    </li>`;

    noteContainer.insertAdjacentHTML('beforeend', liTag);
  });
}

function showMenu(elem){
  elem.parentElement.classList.add("show");
  document.addEventListener("click", e => {
      //removing show from the settings menu on document click
      if(e.target.tagName != "I" || e.target != elem) {
          elem.parentElement.classList.remove("show");
      }
  });
}

function deleteNote(noteId){
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if(!confirmDel) return;
  daFiles[activeTabIndex].notes.splice(noteId, 1);  //removing selected note from array/tasks
  //saving updated notes to local storage
  showNotes(flex2.children[activeTabIndex], daFiles[activeTabIndex])
}

addBox.addEventListener('click', (e) => {
  e.preventDefault();
  let cardName = nameTag.value;
  let siteName = siteTag.value;
  let userName = userTag.value;
  let passName = passTag.value;

  if (cardName && siteName && userName && passName) {
    let cardInfo = {
      name: cardName,
      site: siteName,
      username: userName,
      password: passName,
    };
    daFiles[activeTabIndex].notes.push(cardInfo);
    closeIcon.click();
    showNotes(flex2.children[activeTabIndex], daFiles[activeTabIndex]);
  }
})  