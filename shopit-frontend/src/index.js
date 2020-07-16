const BASE_URL = 'http://localhost:3000'

window.addEventListener('load', () => {
    getLists()
})

function getLists() {
    clearForm()
    clearUls()
    const showLists = document.querySelector('#show-lists ul')
    fetch(BASE_URL+'/lists')
    .then(resp => resp.json())
    .then(lists => {
        lists.forEach(list => {
            let shoppingList = new List(list)
            showLists.innerHTML += shoppingList.render()

            let ul = document.querySelector(`li#list-${list.id} #items`)
            list.items.forEach(item => {
                ul.innerHTML += `<li>${item.name}</li>`
        })
    })
        attachClickToLinks()
    })
}

function clearUls() {
    const showLists = document.querySelector('#show-lists ul')
    showLists.innerHTML = ''
    const showList = document.querySelector('#show-list')
    showList.innerHTML = ''
}

function clearForm() {
    const listFromDiv = document.getElementById('list-form')
    listFromDiv.innerHTML = ''
}

function attachClickToLinks() {
    const lists = document.querySelectorAll('li a')
    lists.forEach(list => {
        list.addEventListener('click', displayList)
    })

    document.getElementById('listForm').addEventListener('click', displayCreateForm)
    document.getElementById('lists').addEventListener('click', getLists)
}

function displayList() {
    clearForm()
    clearUls()
    let id = event.target.dataset.id 
    let showLists = document.getElementById('show-list')
    showLists.innerHTML = ''
    fetch(BASE_URL+'/lists/'+id)
    .then(resp => resp.json())
    .then(list => {
        showLists.innerHTML += `<h3>${list.name}</h3>`
    })
}

function displayCreateForm() {
    let listFromDiv = document.getElementById('list-form')
    let html = `
        <form>
            <label>Name</label>
            <input type="text" id="name">
            <input type="submit">
        </form>
    `
    listFromDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createList)
}

function createList() {
    event.preventDefault()
    const list = {
        name: document.getElementById('name').value
    }

    fetch(BASE_URL+'/lists', {
        method: 'POST',
        body: JSON.stringify(list),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        }
    })
    .then(resp => resp.json())
    .then(list => {
        document.querySelector('#show-lists ul').innerHTML += `
        <li>
            <a href="#" data-id="${list.id}">${list.name}</a>        
        </li>
        `
        attachClickToLinks()
        clearForm()
    })
}