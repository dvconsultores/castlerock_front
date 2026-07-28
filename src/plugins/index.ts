import vuetify from './vuetify';
import axios from './axios';
import firebase from './firebase';

export default {
  install(app: any) {
    app.use(vuetify);
    app.use(axios);
    app.use(firebase);
  },
};