import Fetch from './api/Fetch.js';
import ProductCard from './components/ProductCard.js';
import MenuList from './components/MenuList.js';
import Basket from './components/Basket.js';

class App {
    constructor() {
        this.response = null;
        this.productCards = [];
        this.url = './js/data/data.json';

        this.menuList = null;
        this.basket = null;
    }

    async request(url) {
        const fetchApi = new Fetch();
        const data = await fetchApi.loadJSON(url);
        this.response = data;
    }

    init() {
        (async () => {
            await this.request(this.url);
            this.initComponents();
        })();
    }

    initComponents() {
        this.initSideBar();
        this.initProductCards();
    }

    initSideBar() {
        this.menuList = new MenuList(this.response.categories);
        this.basket = new Basket();
        this.menuList.render();
        this.basket.render();
    }

    initProductCards() {
        let id = 1;
        for (let product of this.response.menu) {
            product.id = id++;
            product.marketImage = this.response.markets[product.market].image;
            const productCard = new ProductCard(product);
            this.productCards.push(productCard);
            productCard.render();
        }
    }
}

const app = new App();
app.init();
