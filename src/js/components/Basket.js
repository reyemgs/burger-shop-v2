export default class Basket {
    constructor(props) {
        this.sideBar = document.querySelector('#sidebar-wrapper');
        // this.eventHandler = props.eventHandler;
        this.addedProducts = [];
        this.totalPrice = 0;
    }

    addProduct(product) {
        const addedProduct = this.addedProducts.find(item => item === product);
        if (!addedProduct) {
            this.addedProducts.push(addedProduct);
        }
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'basket';

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
        wrapper.append(header, body);
        this.sideBar.append(wrapper);
    }
}
