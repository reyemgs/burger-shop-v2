import Fetch from './api/Fetch.js';

class App {
    constructor() {
        this.response = null;
        this.url = './js/data/data.json';
    }

    init() {
        (async () => {
            await this.request(this.url);
        })();
    }

    async request(url) {
        const fetchApi = new Fetch();
        const data = await fetchApi.loadJSON(url);
        this.response = data;
    }
}

const app = new App();
app.init();
