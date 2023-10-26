import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router/router.js';
import { createAuth0 } from '@auth0/auth0-vue'

createApp(App)
    .use(createAuth0({
        domain: 'dev-tyxya0x02hnaj32g.us.auth0.com',
        clientId: 'aYNtQzNGEBkt8RMiTqUhC4v0cH7puGMO',
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    })
    )
    .use(router)
    .mount('#app')
