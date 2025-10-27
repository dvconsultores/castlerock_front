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
      autocomplete="off"
      prepend-inner-icon="mdi-email-outline" 
      placeholder="Enter your email recovery"
      hide-details
      maxlength="150"
      :class="{'textfield-error': emailError, 'login-textfield': true }"
      @keyup.enter="resetPassword"
      ></v-text-field>

      <v-text-field
      v-model="token"
      variant="solo"
      flat
      autocomplete="off"
      prepend-inner-icon="mdi-numeric"
      placeholder="Enter your recovery code"
      hide-details
      maxlength="6"
      :class="{'textfield-error': codeError, 'login-textfield': true}"
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
      autocomplete="off"
      maxlength="150"
      :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"
      placeholder="Enter your new password"
      @click:append-inner="showPassword = !showPassword"
      :type="showPassword ? 'text' : 'password'"
      :rules="passwordRules"
      :class="{'textfield-error': passwordError, 'login-textfield': true}"
      @keyup.enter="resetPassword"
      ></v-text-field>

      <v-text-field
      v-model="passwordConfirmation"
      variant="solo"
      flat
      autocomplete="off"
      maxlength="150"
      :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"
      placeholder="Confirm your new password"
      :rules="passwordMatchRule"
      @click:append-inner="showPassword = !showPassword"
      :type="showPassword ? 'text' : 'password'"
      :class="{'textfield-error': passwordConfirmationError, 'login-textfield': true}"
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
const emailError = ref('');
const codeError = ref('');
const passwordError = ref('');
const passwordConfirmationError = ref('');
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
  // Clear previous errors
  emailError.value = '';
  codeError.value = '';
  passwordError.value = '';
  passwordConfirmationError.value = '';

  // Validate all fields
  let isValid = true;

  if (!email.value?.trim()) {
    emailError.value = 'Please enter your email address';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email format (e.g. user@example.com)';
    isValid = false;
  }

  if (!token.value?.trim()) {
    codeError.value = 'Please enter your recovery code';
    isValid = false;
  } else if (token.value.length !== 6) {
    codeError.value = 'Code must be 6 digits';
    isValid = false;
  }

  if (!password.value?.trim()) {
    passwordError.value = 'Please enter a new password';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
    isValid = false;
  }

  if (!passwordConfirmation.value?.trim()) {
    passwordConfirmationError.value = 'Please confirm your password';
    isValid = false;
  } else if (passwordConfirmation.value !== password.value) {
    passwordConfirmationError.value = 'Passwords must match';
    isValid = false;
  }

  if (!isValid) {
    showAlert('Please fix the errors in the form', 'error');
    return;
  }

  loadingReset.value = true;
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
    }, 2000);
  } catch (error) {
    loadingReset.value = false;
    const errorMessage = error.response?.data?.message?.[0] || error.response?.data?.error || 'Failed to send recovery email';    
    showAlert('Incorrect code', 'error');
  }
};
</script>


<style lang="scss">
@import '@/assets/styles/pages/password-recovery.scss';
</style>

