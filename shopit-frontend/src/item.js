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
                <a href="#" data-id="${this.id}">${this.name}</a>
                <ul id="items">
                </ul>        
            </li> `
    }

    renderUls() {
        let ul = document.querySelector(`li#item-${this.id} #items`)
            this.items.forEach(item => {
            ul.innerHTML += `<li>${item.name}</li>`
        })
    }
}