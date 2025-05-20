<template>
  <div id="password-recovery">
    <img src="@/assets/sources/images/up-left-corner.svg" alt="Up" class="img-left-up">
    <img src="@/assets/sources/images/bottom-left-corner.svg" alt="Up" class="img-left-bottom">
    <img src="@/assets/sources/images/bottom-right-corner.svg" alt="Up" class="img-right-bottom">


    <section class="section1-forgot-password">
      <h2 class="font2 tcenter mb-0" style="color: #4E444B;">Reset Your Password</h2>
      <span class="f16 tcenter" style="color: #4E444B;">Enter your email address and we will send you a link to recover your password.</span>

      <v-text-field 
      v-model="email"
      variant="solo" 
      flat
      prepend-inner-icon="mdi-email-outline" 
      placeholder="Enter your email recovery"
      hide-details
      maxlength="150"
      class="login-textfield"
      @keyup.enter="resetPassword"
      ></v-text-field>

      <v-text-field
      v-model="token"
      variant="solo"
      flat
      prepend-inner-icon="mdi-numeric"
      placeholder="Enter your recovery code"
      hide-details
      maxlength="6"
      class="login-textfield"
      :rules="tokenRules"
      @input="sanitizeToken"
      @keypress="(e) => { if (!/^\d$/.test(e.key) || token.length >= 6) e.preventDefault(); }"
      @paste="e => { e.preventDefault(); }"
      @keyup.enter="resetPassword"
      ></v-text-field>

      <v-text-field
      v-model="password"
      variant="solo"
      flat
      maxlength="150"
      :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"
      placeholder="Enter your new password"
      @click:append-inner="showPassword = !showPassword"
      :type="showPassword ? 'text' : 'password'"
      :rules="passwordRules"
      class="login-textfield"
      @keyup.enter="resetPassword"
      ></v-text-field>

      <v-text-field
      v-model="passwordConfirmation"
      variant="solo"
      flat
      maxlength="150"
      :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"
      placeholder="Confirm your new password"
      :rules="passwordMatchRule"
      @click:append-inner="showPassword = !showPassword"
      :type="showPassword ? 'text' : 'password'"
      class="login-textfield"
      style="margin-top: -24px;"
      @keyup.enter="resetPassword"
      ></v-text-field>

      <div class="fullw div-btn">
        <v-btn class="btn" @click="resetPassword" :loading="loadingReset"
          :disabled="!isValidForm">
          Reset Password
        </v-btn>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRouter } from 'vue-router';

const email = ref('');
const token = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const loadingReset = ref(false);
const showAlert = inject('showAlert');
const showPassword = ref(false);
const router = useRouter();
const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length >= 6) || 'Password must be at least 6 characters',
  (v) => /[A-Z]/.test(v) || 'Must contain at least 1 uppercase letter',
  (v) => /[a-z]/.test(v) || 'Must contain at least 1 lowercase letter',
];

const tokenRules = [
  (v) => !!v || 'Recovery code is required',
  (v) => /^\d+$/.test(v) || 'Only numbers are allowed',
  (v) => v.length === 6 || 'Code must be 6 digits'
];

const passwordMatchRule = computed(() => [
  (v) => v === password.value || 'Passwords must match',
]);

const sanitizeToken = () => {
  token.value = token.value.replace(/\D/g, '');
};

const isValidForm = computed(() => {
  return email.value &&
  token.value &&
  password.value &&
  passwordConfirmation.value &&
  !passwordRules.some(rule => rule(password.value) !== true) &&
  !passwordMatchRule.value.some(rule => rule(passwordConfirmation.value) !== true);
});

const resetPassword = async () => {
  if (email.value?.trim() && token.value?.trim() && password.value?.trim() && passwordConfirmation.value?.trim()) {
    loadingReset.value = true;

  if (!email.value?.trim()) {
    showAlert('Please enter a valid email address', 'error');
    loadingReset.value = false;
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showAlert('Please enter a valid email format (e.g. user@example.com)', 'error');
    loadingReset.value = false;
    return;
  }
  try {
    const response = await axiosInstance.post('/auth/reset-password', {
      email: email.value,
      token: token.value,
      newPassword: passwordConfirmation.value,
    });
    
    loadingReset.value = false;
    showAlert('Password reset succesfully!', 'success');
    setTimeout(() => {
      router.push('/');
      console.log('Redirecting to login page...');
    }, 2000);
  } catch (error) {
    loadingReset.value = false;
    const errorMessage = error.response?.data?.message?.[0] || error.response?.data?.error || 'Failed to send recovery email';    
    showAlert('Incorrect code', 'error');
  }
  } else {
    showAlert('Please fill in all fields', 'error');
  }
};
</script>


<style lang="scss">
@import '@/assets/styles/pages/password-recovery.scss';
</style>

