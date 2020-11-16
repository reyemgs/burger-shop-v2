export default class ProductCard {
    constructor(props) {
        this.id = props.menu.id;
        this.name = props.name;
        this.image = props.image;
        this.price = props.price;
        this.description = props.description;
        this.market = props.market;
        this.marketImage = props.
        this.category = props.category;
        this.type = props.type;
        this.weight = props.weight;
        this.components = props.components;
        this.quantity = 1;
        this.added = false;
    }

    render() {
        const image = document.createElement('img');
        image.className = 'product-image';
        image.setAttribute('src', '/data/' + this.image);

        const name = document.createElement('span');
        name.className = 'product-name';
        name.innerHTML = this.name;

        const description = document.createElement('div');
        description.className = 'product-description';
        description.innerHTML = this.description;

        const price = document.createElement('span');
        price.className = 'product-price';
        price.innerHTML = `Цена: ${product.price} руб.`;

        const quantityLabel = document.createElement('span');
        quantityLabel.className = 'product-quantity-label';
        quantityLabel.innerHTML = 'Количество';

        const inBasketButton = document.createElement('button');
        inBasketButton.className = 'in-basket-button';
        inBasketButton.setAttribute('data-product-card-id', this.id);
        inBasketButton.innerHTML = 'В КОРЗИНУ';

        const quantityWrapper = document.createElement('div');
        quantityWrapper.className = 'set-quantity-wrapper';

        const quantity = document.createElement('span');
        quantity.className = 'product-quantity';
        quantity.setAttribute('data-quantity-id', this.id);
        quantity.innerHTML = this.productQuantity;

        const increaseButton = document.createElement('div');
        increaseButton.className = 'increase-button';
        increaseButton.setAttribute('data-increase-id', this.id);
        increaseButton.innerHTML = '<i class="fas fa-plus-circle"></i>';

        const decreaseButton = document.createElement('div');
        decreaseButton.className = 'decrease-button';
        decreaseButton.setAttribute('data-decrease-id', this.id);
        decreaseButton.innerHTML = '<i class="fas fa-minus-circle"></i>';

        quantityWrapper.append(quantityLabel, decreaseButton, quantity, increaseButton, inBasketButton);

        const rightSideWrapper = document.querySelector('#rightside-wrapper');

        const productCardWrapper = document.createElement('div');
        productCardWrapper.className = 'product-card-wrapper';

        productCardWrapper.append(market, image, name, description, price, quantityWrapper);
        rightSideWrapper.append(productCardWrapper);
    }
}
