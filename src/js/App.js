import Fetch from './api/Fetch.js';
import ProductCard from './components/ProductCard.js';
import MenuList from './components/MenuList.js';
import Basket from './components/Basket.js';
import EventHandler from './components/EventHandler.js';

class App {
    constructor() {
        this.response = null;
        this.productCards = [];
        this.url = './js/data/data.json';

        this.menuList = null;
        this.basket = null;

        this.eventHandler = new EventHandler();

        this.eventHandler.on('renderByCategory', category => {
            this.renderProductsByCategory(category);
        });
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
        this.initProductCards();
        this.initSideBar();
    }

    initSideBar() {
        this.menuList = new MenuList(this.response.categories, this.eventHandler);
        this.menuList.render();

        this.basket = new Basket(this.eventHandler);
        this.basket.render();
    }

    initProductCards() {
        let id = 1;
        for (let product of this.response.menu) {
            product.id = id++;
            product.marketImage = this.response.markets[product.market].image;
            const productCard = new ProductCard(product, this.eventHandler);
            this.productCards.push(productCard);
        }
    }

    renderProductsByCategory(category) {
        const filtered = this.productCards.filter(item => item.category === category);
        for (const product of filtered) {
            product.render();
        }
    }
}

const app = new App();
app.init();
