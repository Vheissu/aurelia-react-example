import {Container} from 'aurelia-framework';

import {Auth} from './common/auth/auth';

export class App {
    configureRouter(config, router) {
        config.title = 'Aurelia Starter';

        config.map([
            { 
                route: ['', 'home'], 
                moduleId: './routes/home/index', 
                title: 'Home', 
                nav: true 
            }
        ]);

        this.router = router;
    }
}