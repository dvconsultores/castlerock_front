<template>
  <nav id="navbar">
    <div class="left-container">
      <v-icon @click="$router.push(-1)">mdi-chevron-left</v-icon>
      <div class="flexcol">
        <h3>
          {{ currentTitle  }}
        </h3>
        <span>
          {{ currentSubTitle }}
        </span>
      </div>
    </div>

    <div class="rigth-container">
      <img src="@/assets/sources/icons/bell-notification.svg" alt="Bell" class="img-bell">

      <div class="div-img-user">
        <img src="@/assets/sources/images/user.png" alt="">
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const pageTitles = {
  '/home': 'Dashboard',
  '/home/students': 'Students Management',
  '/home/student-registration': 'Students',
  '/home/programs': 'Management of Additional Programs',
  '/home/additional-program': 'New Additional Programs',
  '/home/classrooms': 'Classrooms',
  '/home/new-classroom': 'Classroom',
  '/home/new-weekly-schedule': 'Classrooms Schedule',
  '/home/daily-schedule': 'Daily Schedule',
  '/home/centers': 'Centers',
  '/home/new-center': 'New Center',
  '/home/teachers': 'Teachers',
  '/home/new-teacher': 'New Teacher',
};

const currentTitle = computed(() => {
  return pageTitles[route.path] || 'Dashboard';
});

const subTitle = {
  '/home': 'Home',
  '/home/students': 'Organize and Administer',
  '/home/student-registration': 'Registration',
  '/home/programs': 'Organize and Manage the Programs',
  '/home/additional-program': 'Add and customize a new program',
  '/home/classrooms': 'Organize and Administer',
  '/home/new-classroom': 'Register',
  '/home/new-weekly-schedule': 'Organize your class efficiently',
  '/home/daily-schedule': 'Organize Your Day',
  '/home/student-profile': 'Profile',
  '/home/centers': 'Centers',
  '/home/new-center': 'Add a new center',
  '/home/teachers': 'Teachers',
  '/home/new-teacher': 'Add a new teacher',
}

const currentSubTitle = computed(() => {
  return subTitle[route.path] || 'Dashboard';
});
</script>

<style lang="scss">

#navbar{
  width: calc(100% - 156px);
  background-color: #F8F8F8;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(#000000, 0.1);
  position: absolute;
  top: 0;

  @media (max-width: 1000px) {
    width: 100%;
  }

  .left-container{
    display: flex;
    align-items: flex-start;
    margin-left: 16px;
    gap: 10px;

    .v-icon{
      color: #47464D;
    }

    div h3{
      font-size: 24px;
      font-family: var(--font-2);
      line-height: 24px;
      margin-bottom: 0px;
      text-align: left;
      color: #47464D;
    }

    div span{
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      color: #47464D;
    }
  }

  .rigth-container{
    margin-right: 16px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

    .img-bell{
      width: 24px;
      height: 24px;
    }

    .div-img-user{
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid #7583D9;
      overflow: hidden;
      display: grid;
      place-items: center;

      img{
        width: 48px;
        height: 48px;
      }
    }
  }
}

</style>