const BASE_URL = 'http://localhost:3000'

window.addEventListener('load', () => {
    getLists()
})

function getLists() {
    clearForm()
    const main = document.getElementById('main')
    main.innerHTML = ''
    fetch(BASE_URL+'/lists')
    .then(resp => resp.json())
    .then(lists => {
        main.innerHTML += lists.map(list => `
            <li>
                <a href="#" data-id="${list.id}">${list.name}</a>        
            </li>
        `).join('')

        attachClickToLinks()
    })
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

    document.getElementById('list-form').addEventListener('click', displayCreateForm)
    document.getElementById('lists').addEventListener('click', getLists)
}

function displayList(){

}

function displayCreateForm() {

}