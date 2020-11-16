export default class MenuList {
    constructor(props, handler) {
        this.items = props;
        this.eventHandler = handler;
        this.onPage('pizza');
    }

    onPage(category) {
        const rightSideWrapper = document.querySelector('#rightside-wrapper');
        rightSideWrapper.innerHTML = '';
        this.eventHandler.emit('renderByCategory', category);
    }

    render() {
        const ul = document.querySelector('.menu-list');
        for (const item of this.items) {
            const li = document.createElement('li');
            li.setAttribute('id', item.category);
            li.className = 'menu-item';
            li.innerHTML = item.name;

            li.addEventListener('click', () => this.onPage(item.category));

            ul.append(li);
        }
    }
}
