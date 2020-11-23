export default class Basket {
    constructor(handler) {
        this.basketWrapper = document.querySelector('.basket');
        this.addedProducts = [];
        this.totalPrice = 0;

        this.productWrapper = null;

        this.eventHandler = handler;

        this.eventHandler.on('addInBasket', product => {
            this.addProduct(product);
            this.updateTotalPrice();
        });

        this.eventHandler.on('changeQuantity', () => {
            this.renderAddedProducts();
            this.updateTotalPrice();
        });

        this.eventHandler.on('updateBasketTotalPrice', () => {
            this.updateTotalPrice();
        });

        this.eventHandler.on('updateIngridients', () => {
            this.renderAddedProducts();
        });
    }

    addProduct(product) {
        const addedProduct = this.addedProducts.find(item => item === product);
        if (!addedProduct) {
            this.addedProducts.push(product);
        }
        this.renderAddedProducts();
        this.productWrapper.classList.add(
            'animate__animated',
            'animate__bounceInLeft',
            'animate__faster'
        );
    }

    removeProduct(product) {
        const index = this.addedProducts.findIndex(item => item === product);
        const currentProduct = this.addedProducts[index];

        currentProduct.quantity = 1;
        currentProduct.priceWithIngridients = currentProduct.price;
        currentProduct.updateQuantity();
        currentProduct.resetDefault();

        this.addedProducts.splice(index, 1);
        this.renderAddedProducts();
    }

    updateTotalPrice() {
        const totalPriceLabel = document.querySelector('.basket-total-price');
        this.totalPrice = 0;
        for (const item of this.addedProducts) {
            if (item.type === 'multiple') {
                this.totalPrice += item.priceWithIngridients * item.quantity;
                continue;
            }
            this.totalPrice += item.price * item.quantity;
        }
        totalPriceLabel.innerHTML = `Итого: ${this.totalPrice} руб.`;
    }

    renderAddedProducts() {
        const contentWrapper = document.querySelector('.basket-content-wrapper');
        contentWrapper.innerHTML = '';
        this.addedProducts.map(item => {
            const productWrapper = document.createElement('div');
            productWrapper.classList.add('basket-product');
            this.productWrapper = productWrapper;

            const productName = document.createElement('span');
            productName.className = 'basket-product-name';
            productName.innerHTML = item.name;

            const productQuantity = document.createElement('span');
            productQuantity.className = 'basket-product-quantity';
            productQuantity.innerHTML = item.quantity;

            const removeButton = document.createElement('div');
            removeButton.className = 'remove-button';
            removeButton.innerHTML = '<i class="fas fa-trash-alt fa-lg"></i>';

            removeButton.addEventListener('click', () => {
                this.removeProduct(item);
                this.updateTotalPrice();
            });

            productWrapper.append(
                productName,
                productQuantity,
                removeButton,
                this.renderIngridients(item)
            );
            contentWrapper.append(productWrapper);
        });
    }

    renderIngridients(product) {
        const ingridientWrapper = document.createElement('ul');
        ingridientWrapper.className = 'basket-ingridient-wrapper';

        for (const ingridient of product.addedIngridients) {
            const li = document.createElement('li');
            li.className = 'basket-ingridient';
            li.textContent += ingridient.name;
            ingridientWrapper.append(li);
        }
        return ingridientWrapper;
    }

    render() {
        const header = document.createElement('span');
        header.className = 'basket-header';
        header.innerHTML = '<i class="fas fa-shopping-basket"></i> Корзина';

        const body = document.createElement('div');
        body.className = 'basket-body';

        const labelWrapper = document.createElement('div');
        labelWrapper.className = 'basket-label-wrapper';

        const nameLabel = document.createElement('span');
        nameLabel.className = 'basket-name-label';
        nameLabel.innerHTML = 'Название';

        const quantityLabel = document.createElement('span');
        quantityLabel.className = 'basket-quantity-label';
        quantityLabel.innerHTML = 'Количество';

        const productsWrapper = document.createElement('div');
        productsWrapper.className = 'basket-content-wrapper';

        const totalPriceLabel = document.createElement('span');
        totalPriceLabel.className = 'basket-total-price';
        totalPriceLabel.innerHTML = `Итого: ${this.totalPrice} руб.`;

        const orderButton = document.createElement('button');
        orderButton.className = 'order-button';
        orderButton.innerHTML = 'ОФОРМИТЬ ЗАКАЗ';

        labelWrapper.append(nameLabel, quantityLabel);
        body.append(labelWrapper, productsWrapper, totalPriceLabel, orderButton);
        this.basketWrapper.append(header, body);
    }
}
