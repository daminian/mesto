export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element, position) {
        if (position) {
            this._container.prepend(element)
        } else {
            this._container.append(element);
        }
    }


    renderItems(data, userId) {
        data.forEach((item, userId) => {
            this._renderer(item, userId);
        });
    }
}