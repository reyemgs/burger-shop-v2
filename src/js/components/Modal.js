export default class Modal {
    constructor(props, handler) {
        this.navigationItems = props;
        this.currentProduct = null;
        this.currentPage = null;

        this.eventHandler = handler;

        this.eventHandler.on('openModal', product => this.open(product));
    }

    open(product) {
        this.currentPage = 1;
        this.currentProduct = product;

        const menuItem = this.getMenuItem(this.currentPage);
        this.activeModal();
        this.activePage(menuItem);
        document.body.style.overflow = 'hidden';

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
        if (this.currentPage === this.navigationItems.length) return;
        this.currentPage += 1;

        const content = document.querySelector('.modal-content');
        const menuItem = this.getMenuItem(this.currentPage);

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
