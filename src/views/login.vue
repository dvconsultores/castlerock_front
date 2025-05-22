<template>
  <div id="login">
    <img src="@/assets/sources/images/up-left-corner.svg" alt="Up" class="img-left-up">
    <img src="@/assets/sources/images/bottom-left-corner.svg" alt="Up" class="img-left-bottom">
    <img src="@/assets/sources/images/bottom-right-corner.svg" alt="Up" class="img-right-bottom">


    <section class="section1-login">
      <img src="@/assets/sources/logos/logo.svg" alt="Logo" class="logo mb-0">

      <v-text-field
      v-model="email"
      variant="solo"
      flat
      prepend-inner-icon="mdi-email-outline"
      placeholder="Enter your email or username"
      :class="{'textfield-error': emailError, 'login-textfield': true, 'mt-14': true}"
      maxlength="150"
      @keyup.enter="loginFunction"
      @input="emailError = ''"
      hide-details
      ></v-text-field>

      <v-text-field
      v-model="password"
      variant="solo"
      flat
      maxlength="150"
      prepend-inner-icon="mdi-lock-outline"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="showPassword = !showPassword"
      placeholder="************"
      :class="{'textfield-error': passwordError, 'login-textfield': true, 'mb-0': true}"
      :type="showPassword ? 'text' : 'password'"
      class="login-textfield mb-0"
      @keyup.enter="loginFunction"
      @input="passwordError = ''"
      hide-details
      ></v-text-field>

      <div class="jend fullw mb-6">
        <span class="f12 pointer w500" style="color: #262262;" @click="$router.push('/forgot-password')">Forgot your password?</span>
      </div>

      <div class="flex fullw btn-divs">
        <v-btn class="btn" @click="loginFunction" :loading="loadingLogin" :disabled="!email || !password">
          Login
        </v-btn>
      </div>
    </section>

    <v-dialog v-model="dialogHome" content-class="dialog-home">
      <v-card class="card-dialog">
        <h2 class="tcenter">Welcome</h2>
        <span class="tcenter">Select the center you want to see</span>

        <hr>

        <div class="jspace div-cards">
          <v-card flat class="pointer">
            <img src="@/assets/sources/images/banner_1.png" alt="Banner">

            <h3 class="mb-1 mt-4">Center 1</h3>
            <span class="f16 w400 tcenter">
              Montessori School Castle Rock
            </span>
            <span class="f16 w500 tcenter">
              New York
            </span>
          </v-card>

          <v-card flat class="pointer">
            <img src="@/assets/sources/images/banner_2.png" alt="Banner">

            <h3 class="mb-1 mt-4">Center 2</h3>
            <span class="f16 w400 tcenter">
              Montessori School Castle Rock
            </span>
            <span class="f16 w500 tcenter">
              Miami
            </span>
          </v-card>

          <v-card flat class="pointer" @click="$router.push('/home')">
            <img src="@/assets/sources/images/banner_3.png" alt="Banner">

            <h3 class="mb-1 mt-4">All</h3>
            <span class="f16 w400 tcenter">
              Montessori School Castle Rock
            </span>
          </v-card>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import axiosInstance from '@/plugins/axios';
import axios from 'axios';
import { useRouter } from 'vue-router';


const router = useRouter();
const dialogHome = ref(false);
const email = ref('');
const emailError = ref('');
const passwordError = ref('');
const password = ref('');
const loadingLogin = ref(false);
const showPassword = ref(false);
const showAlert = inject('showAlert');

const loginFunction = async () => {
  emailError.value = '';
  passwordError.value = '';

  if (!email.value?.trim()) {
    emailError.value = 'Please enter a valid email address';
    showAlert(emailError.value, 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email format (e.g. user@example.com)';
    showAlert(emailError.value, 'error');
    return;
  }

  if (!password.value?.trim()) {
    passwordError.value = 'Please enter a valid password';
    showAlert(passwordError.value, 'error');
    return;
  }

  if (email.value?.trim() && password.value?.trim()) {
    loadingLogin.value = true;
  try {
    const response = await axiosInstance.post('/auth/login', {
      email: email.value,
      password: password.value
    });
    localStorage.setItem('idUser', response.data.result.id);
    localStorage.setItem('accessToken', response.data.result.accessToken);
    localStorage.setItem('userRole', response.data.result.role);
    localStorage.setItem('userImage', response.data.result.image)
    loadingLogin.value = false;
    router.push('/home');
  } catch (error) {
    loadingLogin.value = false;
    console.error('Login failed', error);
    showAlert(error.response.data.message, 'error');
  }
  } else {
    showAlert('Please fill in all fields', 'error');
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/pages/login.scss';
</style>

