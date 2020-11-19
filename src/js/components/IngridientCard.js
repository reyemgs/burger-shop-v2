export default class IngridientCard {
    constructor(props, handler) {
        this.id = props.id;
        this.name = props.name;
        this.price = props.price;
        this.image = props.image;
        this.description = props.description;
        this.category = props.category;

        this.eventHandler = handler;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'ingridient-wrapper';
        wrapper.setAttribute('data-ingridient-id', this.id);

        const image = document.createElement('img');
        image.className = 'ingridient-image';
        image.setAttribute('src', `./js/data${this.image}`);

        const name = document.createElement('span');
        name.className = 'ingridient-name';
        name.innerHTML = this.name;

        const price = document.createElement('span');
        price.className = 'ingridient-price';
        price.innerHTML = `Цена: ${this.price} руб.`;

        const content = document.querySelector('.modal-content');
        wrapper.append(image, name, price);
        content.append(wrapper);
    }
}
