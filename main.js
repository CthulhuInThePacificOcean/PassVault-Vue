const closeButton = document.querySelector('#close-button')
//left flex item
const newFileBox = document.querySelector('#box-1')
const folderButton = document.querySelector('#new-folder-button')
const createFolder = document.querySelector('#fileForm')
const createFolderBtn = document.querySelector('#createFolder')
const fileList = document.querySelector('#file-list')
const input = document.querySelector('#file-name')
const tabs = document.querySelectorAll('.tabs')
const tabContents = document.querySelectorAll('.flex-containers')
//right flex item
const flex2 = document.querySelector('#box-2')
//const passItems = document.querySelectorAll('.pass-items')

let tabCount = 0;
closeButton.addEventListener('click', () => {
    newFileBox.style.display = 'none';
})

folderButton.addEventListener('click', () => {
    newFileBox.style.display = 'block';
})

createFolderBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    tab = createFile(input.value)
    tab[0].addEventListener('click', () => {
      tabLoop(fileList, tab[0]);
    })
}) 

function createFile(text){
    const file = document.createElement('li')
    file.setAttribute('id', `${text}`)
    file.setAttribute('data-tab', tabCount)
    file.setAttribute('class', 'tabs')
    file.textContent = text;
    fileList.appendChild(file);
    file.addEventListener('click', switchTab)
    const tabContent = document.createElement('div')
    tabContent.classList.add('tab-pane');
    tabContent.setAttribute('data-tab', tabCount)
    tabContent.textContent = `${text}`
}

function tabLoop(tabList, selectedTab){
    tabList.forEach(tab => {
          tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
          })
          selectedTab.classList.add('active')
      })
}

function switchTab() {
    const selectedTab = this.getAttribute('data-tab');
    
    // Remove 'active' class from all tabs and tab content
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    
    tabContents.forEach(content => {
      content.classList.remove('active');
    });
    
    // Add 'active' class to the selected tab and tab content
    this.classList.add('active');
    const selectedTabContent = document.querySelector(`.tab-pane[data-tab="${selectedTab}"]`);
    selectedTabContent.classList.add('active');
  }