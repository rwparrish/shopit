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
            showLists.innerHTML += shoppingList.renderList()
            shoppingList.renderUls()
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
    const itemFromDiv = document.getElementById('item-form')
    itemFromDiv.innerHTML = ''
}

function attachClickToLinks() {
    const lists = document.querySelectorAll('li a')
    lists.forEach(list => {
        list.addEventListener('click', displayList)
    })

    document.getElementById('listForm').addEventListener('click', displayCreateForm)
    document.getElementById('lists').addEventListener('click', getLists)
    document.querySelectorAll('#delete').forEach(item => item.addEventListener('click', deleteItem))
    document.querySelectorAll('#update-item').forEach(item => item.addEventListener('click', editItem))
    // document.getElementById('add-item').addEventListener('click', displayCreateItemForm)
}





