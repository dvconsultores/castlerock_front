<template>
  <div id="login">
    <img src="@/assets/sources/images/up-left-corner.svg" alt="Up" class="img-left-up">
    <img src="@/assets/sources/images/bottom-left-corner.svg" alt="Up" class="img-left-bottom">
    <img src="@/assets/sources/images/bottom-right-corner.svg" alt="Up" class="img-right-bottom">


    <section class="section1-login">
      <img src="@/assets/sources/logos/logo.svg" alt="Logo" class="logo mb-0">

      <v-text-field 
      variant="solo" 
      flat
      prepend-inner-icon="mdi-email-outline" 
      placeholder="Enter your email or username"
      hide-details
      class="login-textfield mt-14"
      ></v-text-field>

      <v-text-field 
      variant="solo" 
      flat
      prepend-inner-icon="mdi-lock-outline" 
      placeholder="************"
      hide-details
      type="password"
      class="login-textfield mb-0"
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

        <span class="f12 pointer w500" style="color: #262262;">¿Olvidaste la contraseña?</span>
      </div>

      <div class="flex fullw btn-divs">
        <v-btn class="btn" @click="openDialog">
          Login
        </v-btn>

        <v-btn class="btn-2">
          <v-icon>mdi-fingerprint</v-icon>
        </v-btn>
      </div>
    </section>

    <v-dialog v-model="dialogHome" content-class="dialog-home">
      <v-card class="card-dialog">
        <h2>Welcome</h2>
        <span>Select the center you want to see</span>

        <hr>

        <div class="jspace div-cards">
          <v-card flat class="pointer" @click="$router.push('/home')">
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

          <v-card flat class="pointer">
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
import { ref } from 'vue';

const dialogHome = ref(false);

const openDialog = () => {
	dialogHome.value = true;
};


</script>

<style lang="scss">
@import '@/assets/styles/pages/login.scss';
</style>

