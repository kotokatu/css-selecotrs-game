import { Controller } from './controller/controller';
import './style.css';

class App {
    constructor() {
        const controller = new Controller(document.body);
        controller.start();
    }
}

new App();
