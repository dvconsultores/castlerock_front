<template>
  <div id="forgot-password">
    <img src="@/assets/sources/images/up-left-corner.svg" alt="Up" class="img-left-up">
    <img src="@/assets/sources/images/bottom-left-corner.svg" alt="Up" class="img-left-bottom">
    <img src="@/assets/sources/images/bottom-right-corner.svg" alt="Up" class="img-right-bottom">


    <section class="section1-forgot-password">
      <h2 class="font2 tcenter mb-0" style="color: #4E444B;">Password Recovery</h2>
      <span class="f16 tcenter" style="color: #4E444B;">Enter your email address and we will send you a link to recover your password.</span>

      <v-text-field 
      v-model="email"
      variant="solo" 
      flat
      prepend-inner-icon="mdi-email-outline" 
      placeholder="Enter your email recovery"
      hide-details
      maxlength="150"
      :class="{'textfield-error': emailError, 'login-textfield': true}"
      @keyup.enter="sendEmailFuction"
      ></v-text-field>

      <div class="fullw div-btn">
        <v-btn class="btn" @click="sendEmailFuction" :loading="loadingRecovery" :disabled="!email">
          Send Recovery Email
        </v-btn>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRouter } from 'vue-router';

const email = ref('');
const loadingRecovery = ref(false);
const showAlert = inject('showAlert');
const emailError = ref('');

const router = useRouter();

const sendEmailFuction = async () => {
  emailError.value = '';
  if (!email.value?.trim()) {
    emailError.value = 'Please enter your email address';
    showAlert(emailError.value, 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email format (e.g. user@example.com)';
    showAlert(emailError.value, 'error');
    return;
  }

  loadingRecovery.value = true;
  try {
    const response = await axiosInstance.post('/auth/forgot-password', {
      email: email.value,
    });
    
    loadingRecovery.value = false;
    showAlert('Recovery email sent successfully! Check your inbox.', 'success');
    setTimeout(() => {
      router.push('/password-recovery');
    }, 2000);
  } catch (error) {
    loadingRecovery.value = false;
    const errorMessage = error.response?.data?.message?.[0] || error.response?.data?.error || 'Failed to send recovery email';
    showAlert('Failed to send recovery email', 'error');
  }
};
</script>


<style lang="scss">
@import '@/assets/styles/pages/forgot-password.scss';
</style>

