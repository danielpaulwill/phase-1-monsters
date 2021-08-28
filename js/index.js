let pageNum = 1


document.addEventListener('DOMContentLoaded', e => {
    let createMonsterDomContainer = document.getElementById('create-monster')
    createMonsterButton(createMonsterDomContainer)
    monsterRender(pageNum)
    navButtons()
    createMonsterFunc()
    });

function navButtons() {
  let forwardButton = document.getElementById('forward')
    let backButton = document.getElementById('back')
    forwardButton.addEventListener('click', e => {
      pageNum++
      monsterRender(pageNum)
      return pageNum
  });
  backButton.addEventListener('click', e => {
      if (pageNum > 1) {
          pageNum--
      monsterRender(pageNum)
      return pageNum
      }
  });
}

function monsterRender(pageNum) {
    let monsterDomContainer = document.querySelector('#monster-container')
    monsterDomContainer.innerText = ''
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then(data => {
    data.forEach(monster => {
    let monsterContainer = document.createElement('div')
    let monsterName = document.createElement('h2')
    monsterName.innerText = `${monster.name}`
    let monsterAge = document.createElement('h4')
    monsterAge.innerText = `Age: ${monster.age}`
    let monsterDescription = document.createElement('p')
    monsterDescription.innerText = `Bio: ${monster.description}`
    monsterContainer.append(monsterName)
    monsterContainer.append(monsterAge)
    monsterContainer.append(monsterDescription)
    monsterDomContainer.append(monsterContainer)
    })
})};

function createMonsterButton(createMonsterDomContainer) {
  let monsterForm = document.createElement('form')
  let monsterNameInput = document.createElement('input')
  monsterNameInput.type = 'text'
  monsterNameInput.id = 'create-monster-name'
  monsterNameInput.placeholder = 'Name'
  let monsterAgeInput = document.createElement('input')
  monsterAgeInput.type = 'text'
  monsterAgeInput.id = 'create-monster-age'
  monsterAgeInput.placeholder = 'Age'
  let monsterDescriptionInput = document.createElement('input')
  monsterDescriptionInput.type = 'text'
  monsterDescriptionInput.id = 'create-monster-description'
  monsterDescriptionInput.placeholder = 'Description'
  let createMonsterButton = document.createElement('input')
  createMonsterButton.type = 'button'
  createMonsterButton.id = 'create-monster-button'
  createMonsterButton.value = 'Create Monster'
  monsterForm.append(monsterNameInput)
  monsterForm.append(monsterAgeInput)
  monsterForm.append(monsterDescriptionInput)
  monsterForm.append(createMonsterButton)
  createMonsterDomContainer.append(monsterForm)
}

function createMonsterFunc() {
  let createMonsterButton = document.getElementById('create-monster-button')
  let monsterNameInput = document.getElementById('create-monster-name')
  let monsterAgeInput = document.getElementById('create-monster-age')
  let monsterDescriptionInput = document.getElementById('create-monster-description')
  createMonsterButton.addEventListener('click', e => {
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${monsterNameInput.value}`,
        "age": `${monsterAgeInput.value}`,
        "description": `${monsterDescriptionInput.value}`
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    monsterNameInput.value = ''
    monsterAgeInput.value = ''
    monsterAgeInput.value = ''
    monsterDescriptionInput.value = ''
  })
}

