class List {
    constructor(list) {
        this.id = list.id
        this.name = list.name
        this.items = list.items
    }

    renderList() {
        return `
            <li id="list-${list.id}">
                <a href="#" data-id="${list.id}">${list.name}</a>
                <ul id="items">
                </ul>        
            </li> `
    }
}