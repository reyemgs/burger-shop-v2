import Fetch from './api/Fetch.js';
import ProductCard from './components/ProductCard.js';

class App {
    constructor() {
        this.response = null;
        this.productCards = [];
        this.url = './js/data/data.json';
    }

    init() {
        (async () => {
            await this.request(this.url);
            this.initProductCards();
        })();
    }

    initProductCards() {
        let id = 1;
        for (let product of this.response.menu) {
            product.id = id++;
            const productCard = new ProductCard(product);
            this.productCards.push(productCard);
        }
        console.log(this.productCards);
    }

    async request(url) {
        const fetchApi = new Fetch();
        const data = await fetchApi.loadJSON(url);
        this.response = data;
    }
}

const app = new App();
app.init();
