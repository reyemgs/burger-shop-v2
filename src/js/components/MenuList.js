export default class MenuList {
    constructor(props) {
        this.items = props;
    }

    render() {
        const ul = document.querySelector('.menu-list');
        for (const item of this.items) {
            const li = document.createElement('li');
            li.setAttribute('id', item.category);
            li.className = 'menu-item';
            li.innerHTML = item.name;
            ul.append(li);
        }
    }
}
