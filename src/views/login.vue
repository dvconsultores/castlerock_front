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
      hide-details
      class="login-textfield mt-14"
      @keyup.enter="loginFunction"
      ></v-text-field>

      <v-text-field
      v-model="password"
      variant="solo"
      flat
      prepend-inner-icon="mdi-lock-outline"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="showPassword = !showPassword"
      placeholder="************"
      hide-details
      :type="showPassword ? 'text' : 'password'"
      class="login-textfield mb-0"
      @keyup.enter="loginFunction"
      ></v-text-field>

      <div class="jspace fullw mb-6">
        <v-checkbox 
        label="Recuerdame" 
        hide-details 
        density="compact"
        true-icon="mdi-checkbox-outline"
        color="#6EC8AC"
        base-color="#3C3C434D"
        class="checkbox"
        ></v-checkbox>

        <span class="f12 pointer w500" style="color: #262262;" @click="$router.push('/forgot-password')">¿Olvidaste la contraseña?</span>
      </div>

      <div class="flex fullw btn-divs">
        <v-btn class="btn" @click="loginFunction" :loading="loadingLogin" :disabled="!email || !password">
          Login
        </v-btn>

        <v-btn class="btn-2">
          <v-icon>mdi-fingerprint</v-icon>
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
import { ref, inject } from 'vue';
import axiosInstance from '@/plugins/axios';

const dialogHome = ref(false);
const email = ref('');
const password = ref('');
const loadingLogin = ref(false);
const showPassword = ref(false);
const showAlert = inject('showAlert');

const loginFunction = async () => {
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
    dialogHome.value = true;
    console.log('Login successful', response.data);
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

