export default class Modal {
    constructor(props, ingridients, handler) {
        this.navigationItems = props;
        this.ingridients = ingridients;
        this.currentProduct = null;
        this.currentPage = null;

        this.eventHandler = handler;

        this.eventHandler.on('openModal', product => this.open(product));

        this.eventHandler.on('addIngridient', ingridient => this.addIngridient(ingridient));
    }

    open(product) {
        this.currentPage = 1;
        this.currentProduct = product;

        const content = document.querySelector('.modal-content');
        const menuItem = this.getMenuItem(this.currentPage);
        this.activeModal();
        this.activePage(menuItem);

        document.body.style.overflow = 'hidden';
        content.innerHTML = '';
        this.eventHandler.emit('renderIngridientsByCategory', menuItem.category);
    }

    close() {
        this.currentProduct = null;
        this.currentPage = null;

        this.activeModal();

        document.body.removeAttribute('style');
    }

    activeModal() {
        const wrapper = document.querySelector('.modal-wrapper');
        const shadow = document.querySelector('.shadow-modal');
        wrapper.classList.toggle('active');
        shadow.classList.toggle('active');
    }

    nextPage() {
        if (this.isLastPage()) {
            return;
        }

        this.currentPage += 1;
        const content = document.querySelector('.modal-content');
        const menuItem = this.getMenuItem(this.currentPage);

        if (this.isLastPage()) {
            this.onDonePage(content, menuItem);
            return;
        }

        this.activePage(menuItem);
        content.innerHTML = '';
        this.eventHandler.emit('renderIngridientsByCategory', menuItem.category);
    }

    previousPage() {
        if (this.currentPage === 1) return;

        this.currentPage -= 1;
        const content = document.querySelector('.modal-content');
        const menuItem = this.getMenuItem(this.currentPage);

        this.activePage(menuItem);
        content.innerHTML = '';
        this.eventHandler.emit('renderIngridientsByCategory', menuItem.category);
    }

    onDonePage(content, menuItem) {
        content.innerHTML = '';
        this.renderDonePage();
        this.activePage(menuItem);
    }

    isLastPage() {
        return this.currentPage === this.navigationItems.length;
    }

    activePage(menuItem) {
        const items = document.querySelectorAll('.modal-menu-item');

        for (const item of items) {
            item.classList.remove('active');
            if (item.getAttribute('data-category') === menuItem.category) {
                const title = document.querySelector('.modal-title');
                item.classList.add('active');
                title.innerHTML = menuItem.title;
            }
        }
    }

    getMenuItem(id) {
        return this.navigationItems.find(item => item.id === id);
    }

    addIngridient(ingridient) {
        const components = this.currentProduct.components;
        components[ingridient.category] = ingridient.key;
    }

    renderDonePage() {
        const product = this.currentProduct;

        const {
            sizes: productSizes,
            breads: productBreads,
            vegetables: productVegetables,
            sauces: productSauces,
            fillings: productFillings,
        } = product.components;

        const { sizes, breads, vegetables, sauces, fillings } = this.ingridients;

        const footer = document.querySelector('.modal-footer');

        const wrapper = document.createElement('div');
        wrapper.className = 'done-wrapper';

        const header = document.createElement('span');
        header.className = 'done-header';
        header.innerHTML = 'Ваш сендвич готов!';

        const info = document.createElement('div');
        info.className = 'done-info';

        const sizeElem = document.createElement('span');
        sizeElem.className = 'done-size';
        sizeElem.innerHTML = `Размер: ${sizes[productSizes].name} `;

        const breadElem = document.createElement('span');
        breadElem.className = 'done-bread';
        breadElem.innerHTML = `Хлеб: ${breads[productBreads].name}`;

        const vegetablesElem = document.createElement('span');
        vegetablesElem.className = 'done-vegetables';
        vegetablesElem.innerHTML = `Овощи: `;

        const saucesElem = document.createElement('span');
        saucesElem.className = 'done-sauces';
        saucesElem.innerHTML = `Соусы: `;

        const fillingsElem = document.createElement('span');
        fillingsElem.className = 'done-fillings';
        fillingsElem.innerHTML = `Начинка: `;

        const name = document.createElement('span');
        name.className = 'done-name';
        name.innerHTML = `${product.name}`;

        const image = document.createElement('img');
        image.className = 'product-image';
        image.setAttribute('src', `./js/data${product.image}`);

        const content = document.querySelector('.modal-content');
        info.append(sizeElem, breadElem, vegetablesElem, saucesElem, fillingsElem);
        wrapper.append(header, info, name);
        content.append(image, wrapper);
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('modal-wrapper');

        const content = document.createElement('div');
        content.className = 'modal-content';

        const closeButton = document.createElement('div');
        closeButton.className = 'close-modal';
        closeButton.innerHTML = '<i class="fas fa-times fa-2x"></i>';

        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'modal-button-wrapper';

        const nextButton = document.createElement('button');
        nextButton.className = 'next-button';
        nextButton.innerHTML = 'ВПЕРЕД';

        const previousButton = document.createElement('button');
        previousButton.className = 'previous-button';
        previousButton.innerHTML = 'НАЗАД';

        buttonWrapper.append(previousButton, nextButton);

        const inBasketButton = document.createElement('button');
        inBasketButton.className = 'modal-in-basket';
        inBasketButton.innerHTML = 'В КОРЗИНУ';

        const title = document.createElement('span');
        title.className = 'modal-title';

        const header = document.createElement('div');
        header.className = 'modal-header';
        header.append(title, closeButton);

        const footer = document.createElement('div');
        footer.className = 'modal-footer';

        const price = document.createElement('span');
        price.className = 'modal-price';
        price.innerHTML = `Цена: `;

        const ul = document.createElement('ul');
        ul.className = 'items-list';

        for (const item of this.navigationItems) {
            const li = document.createElement('li');

            li.setAttribute('data-category', item.category);
            li.className = 'modal-menu-item';
            li.innerHTML = item.name;

            ul.append(li);
        }

        nextButton.addEventListener('click', () => this.nextPage());
        previousButton.addEventListener('click', () => this.previousPage());
        closeButton.addEventListener('click', () => this.close());

        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'items-wrapper';
        itemWrapper.append(ul);

        const shadow = document.createElement('div');
        shadow.classList.add('shadow-modal');

        wrapper.append(header, buttonWrapper, itemWrapper, content, footer);
        const rightSideWrapper = document.querySelector('#rightside-wrapper');
        rightSideWrapper.after(wrapper, shadow);
    }
}
