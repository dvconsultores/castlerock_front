<template>
  <v-navigation-drawer :width="156" :mobile-breakpoint="1000" color="#F8F8F8" floating>
    <img src="@/assets/sources/logos/logo.svg" alt="Logo" class="logo mb-0">
    
    
    <div class="menu">
      <div class="icon-container" :class="{ 'icon-container-selected': isRouteActive('/home') }" @click="$router.push('/home')">
        <img src="@/assets/sources/icons/home.svg" alt="Home">
        <span class="w600 f14" style="color: #262262;">Home</span>
      </div>

      <div class="icon-container" :class="{ 'icon-container-selected': isRouteActive('/centers') || isRouteActive('/home/new-center')}" @click="$router.push('/home/centers')">
        <img src="@/assets/sources/icons/centers.svg" alt="Centers">
        <span class="w600 f14" style="color: #262262;">Centers</span>
      </div>

      <div class="icon-container" :class="{ 'icon-container-selected': isRouteActive('/home/students') || isRouteActive('/home/student-registration')  }" @click="$router.push('/home/students')">
        <img src="@/assets/sources/icons/students.svg" alt="Students">
        <span class="w600 f14" style="color: #262262;">Students</span>
      </div>

      <div class="icon-container" :class="{ 'icon-container-selected': isRouteActive('/home/classrooms') || isRouteActive('/home/new-classroom') }" @click="$router.push('/home/classrooms')">
        <img src="@/assets/sources/icons/classroms.svg" alt="Classroms">
        <span class="w600 f14" style="color: #262262;">Classroms</span>
      </div>

      <div class="icon-container" :class="{ 'icon-container-selected': isRouteActive('/home/teachers') || isRouteActive('home/new-teacher')}" @click="$router.push('/home/teachers')">
        <img src="@/assets/sources/icons/teachers.svg" alt="Teacher">
        <span class="w600 f14" style="color: #262262;">Teacher</span>
      </div>

      <div class="icon-container" :class="{ 'icon-container-selected': isRouteActive('/home/programs') || isRouteActive('/home/additional-program') }" @click="$router.push('/home/programs')">
        <img src="@/assets/sources/icons/programs.svg" alt="Programs">
        <span class="w600 f14 tcenter" style="color: #262262; line-height: 100%;">Additional <br> Programs</span>
      </div>

      <div class="logout-container mt-12 pointer">
        <img src="@/assets/sources/icons/logout.svg" alt="Logout" @click="$router.push('/')">
        <span class="w600 f14 tcenter" style="color: #262262;">Log out</span>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isRouteActive = (path) => {
  return route.path === path
}
</script>

<style lang="scss">

.v-navigation-drawer{
  background-color: #F8F8F8;
  border-right: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
  
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  .v-navigation-drawer__content {
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .logo{
    width: 99px;
    height: 117px;
    margin-top: 32px;
    margin-bottom: 32px!important;
  }

  .menu{
    background-color: #6EC8AC;
    box-shadow: inset 0 8px 11px 4px rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    border-top-right-radius: 88px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 60px;
    padding-bottom: 0px;
    gap: 10px;

    .icon-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 88px;
      width: 99px;
      gap: 5px;
      cursor: pointer;
    }

    .icon-container:hover{
      background-color: #F8F8F8;
      border-radius: 20px;
      position: relative;

      ::after {
        content: "";
        position: absolute;
        width: 50px;
        height: 44px;
        background-color: #F8F8F8;
        top: -3px;
        bottom: 0px;
        right: -40px;
        transform: translateY(50%);
      }
    }

    .icon-container-selected{
      background-color: #F8F8F8;
      border-radius: 20px;
      position: relative;

      ::after {
        content: "";
        position: absolute;
        width: 50px;
        height: 44px;
        background-color: #F8F8F8;
        top: -3px;
        bottom: 0px;
        right: -40px;
        transform: translateY(50%);
      }
    }

    .logout-container{
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 88px;
      width: 99px;
      gap: 5px;
      border-top: 1px solid rgba(0, 0, 0, 0.3);
    }
  }
}


</style>