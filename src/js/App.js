import Fetch from './api/Fetch.js';
import ProductCard from './components/ProductCard.js';
import MenuList from './components/MenuList.js';

class App {
    constructor() {
        this.response = null;
        this.productCards = [];
        this.url = './js/data/data.json';

        this.menuList = null;
    }

    init() {
        (async () => {
            await this.request(this.url);
            this.initComponents();
        })();
    }

    initComponents() {
        this.initMenuList();
        this.initProductCards();
    }

    initMenuList() {
        this.menuList = new MenuList(this.response.categories);
    }

    initProductCards() {
        let id = 1;
        for (let product of this.response.menu) {
            product.id = id++;
            product.marketImage = this.response.markets[product.market].image;
            const productCard = new ProductCard(product);
            this.productCards.push(productCard);
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
