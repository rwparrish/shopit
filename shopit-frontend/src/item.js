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
            ${this.name} ${this.description} ${this.quantity} ${this.bought ? "bought" : "Not yet bought"}
            <button id='delete' data-id='${this.id}'>Delete</button>
            <button id='update-item' data-id='${this.id}'>Edit</button>  
            </li> `
    }

}