class Item {
    constructor(item) {
        this.id = item.id
        this.name = item.name
        this.description = item.description
        this.bought = item.bought
        this.quantity = item.quantity
        this.list_id = item.list_id
    }

    renderItem() {
        return `
            <li id="item-${this.id}"> 
            ${this.name} - ${this.description} - ${this.quantity} - ${this.bought ? "bought" : "Not yet bought"}
            <button id='delete' data-id='${this.id}'>Delete</button>
            <button id='update-item' data-id='${this.id}'>Edit</button>  
            </li> `
    }

}

function displayCreateItemForm() {
    let itemFromDiv = document.getElementById('item-form')
    let listId = Number(event.target.dataset.id)
    let html = `
        <form>
            <label>Name</label>
            <input type="text" id="name">
            <label>Description</label>
            <input type="text" id="description">
            <label>Bought</label>
            <input type="checkbox" id="bought">
            <label>Quantity</label>
            <input type="text" id="quantity">
            <input type="hidden" id="list_id" value="${listId}">
            <input type="submit">
        </form>
    `
    itemFromDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createItem)
}

function createItem() {
    event.preventDefault()
    const item = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        baught: document.getElementById('bought').checked,
        quantity: document.getElementById('quantity').value,
        list_id: document.getElementById('list_id').value
    }

    fetch(BASE_URL+'/items', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        }
    })
    .then(resp => resp.json())
    .then(item => {
            const showItems = document.querySelector('#show-list ul')
            let newItem = new Item(item)
            showItems.innerHTML += newItem.renderItem()
            attachClickToLinks()
            clearForm()
        })
}

function deleteItem() {
    event.preventDefault()
    clearForm()

    fetch(BASE_URL+`/items/${event.target.dataset.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        }
    })
    .then(event.target.parentElement.remove())
}

function editItem() {
    event.preventDefault()
    clearForm()
    let id = event.target.dataset.id
    // console.log(id)
    fetch(BASE_URL+`/items/${id}`)
    .then(resp => resp.json())
    .then(item => {
        let itemFromDiv = document.getElementById('item-form')
        console.log(item)
        let html = `
            <form data-id="${id}">
                <label>Name</label>
                <input type="text" id="name" value="${item.name}">
                <label>Description</label>
                <input type="text" id="description" value="${item.description}">
                <label>Bought</label>
                <input type="checkbox" id="bought" ${item.bought ? "checked" : ""}>
                <label>Quantity</label>
                <input type="text" id="quantity" value="${item.quantity}">
                <input type="hidden" id="list_id" value="${item.list.id}">
                <input type="submit">
            </form>
            `
    itemFromDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', updateItem)
    })
}

function updateItem() {
    event.preventDefault()
    let upItem = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        baught: document.getElementById('bought').checked,
        quantity: document.getElementById('quantity').value,
        list_id: document.getElementById('list_id').value
    }
    const id = event.target.dataset.id
    console.log(id)
    fetch(BASE_URL+`/items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(upItem),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        }
    })
    .then(resp => resp.json())
    .then(item => {
            let newItem = new Item(item)
            document.querySelector(`li#list-${item.list.id} #items li#item-${item.id}`).innerHTML = newItem.renderItem()
            attachClickToLinks()
            clearForm()
        })
}
   