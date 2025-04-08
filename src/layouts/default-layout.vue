<template>
  <v-app id="layout">
    <v-main>
      <router-view />

      <Navbar></Navbar>
      <Drawer></Drawer>
    </v-main>
  </v-app>
</template>

<script setup>
import '@/assets/styles/layouts/default-layout.scss'
import Drawer from '@/components/drawer.vue'
import Navbar from '@/components/navbar.vue'

</script>
