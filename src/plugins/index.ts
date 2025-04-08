import vuetify from './vuetify';
import vueSecureStorage from './vueSecureStorage';
import axios from './axios';
import firebase from './firebase';

export default {
  install(app: any) {
    app.use(vuetify);
    app.use(vueSecureStorage);
    app.use(axios);
    app.use(firebase);
  },
};