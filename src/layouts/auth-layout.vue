<template>
  <v-app id="auth-layout">
    <v-main>
      <router-view />
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

<style src="@/assets/styles/layouts/auth-layout.scss" lang="scss"></style>