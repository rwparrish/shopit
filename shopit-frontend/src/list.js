class List {
    constructor(list) {
        this.id = list.id
        this.name = list.name
        this.items = list.items
    }

    renderList() {
        return `
            <li id="list-${this.id}">
                <a href="#" data-id="${this.id}">${this.name}</a>
                <ul id="items">
                </ul>
                        
            </li> `
    }
    // <ul id="items-${this.id}"></ul> - it will affect line 21 and I want to track list id's for items

    renderUls() {
        let ul = document.querySelector(`li#list-${this.id} #items`)
            this.items.forEach(item => {
            ul.innerHTML += `<li id="item-${item.id}">${item.name} - ${item.description} - ${item.quantity} - ${item.bought ? "bought" : "Not yet bought"}
            <button id='delete' data-id='${item.id}'>Delete</button>
            <button id='update-item' data-id='${item.id}'>Edit</button>
            </li>`
        })
    }
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

function getLists() {
    clearForm()
    clearUls()
    const showLists = document.querySelector('#show-lists ul')
    fetch(BASE_URL+'/lists')
    .then(resp => resp.json())
    .then(lists => {
        lists.forEach(list => {
            let shoppingList = new List(list)
            showLists.innerHTML += shoppingList.renderList()
            shoppingList.renderUls()
        })
        attachClickToLinks()
    })
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
            const showLists = document.querySelector('#show-lists ul')
            let shoppingList = new List(list)
            showLists.innerHTML += shoppingList.renderList()
            shoppingList.renderUls()
            attachClickToLinks()
            clearForm()
        })
}

function displayList() {
    
    clearForm()
    clearUls()
    let id = event.target.dataset.id 
    let showList = document.getElementById('show-list')
    fetch(BASE_URL+'/lists/'+id)
    .then(resp => resp.json())
    .then(list => {
        
        showList.innerHTML += `<h3>${list.name}</h3>
        <button id='add-item' data-id='${list.id}'>Add Item</button> <ul></ul>`
            list.items.forEach(item => {
            document.querySelector('#show-list ul').innerHTML += `<li id="item-${item.id}">${item.name} - ${item.description} - ${item.quantity} - ${item.bought ? "bought" : "Not yet bought"}
            <button id='delete' data-id='${item.id}'>Delete</button>
            <button id='update-item' data-id='${item.id}'>Edit</button>
            </li>`
        })
        attachClickToLinks()
        document.getElementById('add-item').addEventListener('click', displayCreateItemForm)
    })
}

