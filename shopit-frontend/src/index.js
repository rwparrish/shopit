const BASE_URL = 'http://localhost:3000'

document.addEventListener('load', () => {
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

