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

    renderUls() {
        let ul = document.querySelector(`li#list-${this.id} #items`)
            this.items.forEach(item => {
            ul.innerHTML += `<li>${item.name}</li>`
        })
    }
}