import VueSecureStorage from 'vue3-storage-secure';

export default {
  install(app: any) {
    app.use(VueSecureStorage, {
      storage: 'local', // or 'session'
      secret: 'your-secret-key', // Replace with your secret key
    });
  },
};