import Fetch from './api/Fetch.js';
import ProductCard from './components/ProductCard.js';
import MenuList from './components/MenuList.js';

class App {
    constructor() {
        this.response = null;
        this.menuList = null;
        this.productCards = [];
        this.url = './js/data/data.json';
    }

    init() {
        (async () => {
            await this.request(this.url);
            this.initProductCards();
            this.initMenuList();
        })();
    }

    initMenuList() {
        this.menuList = new MenuList(this.response.categories);
        this.menuList.render();
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

    async request(url) {
        const fetchApi = new Fetch();
        const data = await fetchApi.loadJSON(url);
        this.response = data;
    }
}

const app = new App();
app.init();
