<template>
  <v-app id="layout">
    <v-main>
      <router-view />

      <Navbar></Navbar>
      <Drawer></Drawer>
    </v-main>

    <Alert
      v-model:show="showAlert"
      :message="alertMessage"
      :type="alertType"
    />
  </v-app>
</template>

<script setup>
import { ref, provide } from 'vue';
import '@/assets/styles/layouts/default-layout.scss'
import Drawer from '@/components/drawer.vue'
import Navbar from '@/components/navbar.vue'
import Alert from '@/components/alert.vue';

const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('info');

const showGlobalAlert = (message, type = 'info') => {
  alertMessage.value = message;
  alertType.value = type;
  showAlert.value = true;
};

provide('showAlert', showGlobalAlert);
</script>
