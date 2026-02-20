<template>
  <v-app id="auth-layout">
    <v-main>
      <router-view />
    </v-main>

      <Pay v-model="showPay" @renew="handleRenew" />

      <Alert
        v-model:show="showAlert"
        :message="alertMessage"
        :type="alertType"
      />
  </v-app>
</template>

<script setup>
import { ref, provide, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Alert from '@/components/alert.vue';
import Pay from '@/components/pay.vue';

const showAlert = ref(false);
const showPay = ref(false);
const alertMessage = ref('');
const alertType = ref('info');

const showGlobalAlert = (message, type = 'info') => {
  alertMessage.value = message;
  alertType.value = type;
  showAlert.value = true;
};

provide('showAlert', showGlobalAlert);

function handleRenew() {
  showGlobalAlert('Subscription renewal started', 'success');
}

const route = useRoute();
const router = useRouter();

onMounted(() => {
  try {
    if (route.query.showPay === '1' || localStorage.getItem('showPay') === 'true') {
      showPay.value = true;
      localStorage.removeItem('showPay');
      if (route.query.showPay === '1') {
        router.replace({ name: route.name ? String(route.name) : 'LoginPage', query: {} }).catch(() => {})
      }
    }
  } catch (e) {
    // ignore
  }
});

// Also watch route changes to handle cases where the layout/component isn't remounted
watch(() => route.fullPath, () => {
  try {
    if (route.query.showPay === '1' || localStorage.getItem('showPay') === 'true') {
      showPay.value = true;
      localStorage.removeItem('showPay');
      if (route.query.showPay === '1') {
        router.replace({ name: route.name ? String(route.name) : 'LoginPage', query: {} }).catch(() => {})
      }
    }
  } catch (e) {
    // ignore
  }
});
</script>

<style src="@/assets/styles/layouts/auth-layout.scss" lang="scss"></style>