export default class Modal {
    constructor(props, handler) {
        this.navigationItems = props;
        this.currentProduct = null;
        this.eventHandler = handler;
    }

    open() {
        this.active();
        document.body.style.overflow = 'hidden';
    }

    active() {
        const wrapper = document.querySelector('.modal-wrapper');
        const shadow = document.querySelector('.shadow-modal');
        wrapper.classList.toggle('active');
        shadow.classList.toggle('active');
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

        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'items-wrapper';
        itemWrapper.append(ul);

        const shadow = document.createElement('div');
        shadow.classList.add('shadow-modal');

        wrapper.append(header, buttonWrapper, itemWrapper, content, footer);
        document.body.append(wrapper, shadow);
    }
}
