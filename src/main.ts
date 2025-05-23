import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// styles
import '@/assets/styles/main.scss';

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(router).mount('#app');
