<template>
  <nav id="navbar">
    <div class="left-container">
      <v-icon @click="$router.go(-1)">mdi-chevron-left</v-icon>
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
      <v-btn @click="toggleDrawer" class="btn-menu" flat>
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>

      <v-menu
        transition="scale-transition"
      >
        <template v-slot:activator="{ props }">
          <img v-bind="props" src="@/assets/sources/icons/bell-notification.svg" alt="Bell" class="img-bell pointer">
        </template>

        <v-list v-for="(item, index) in dataNotes" :key="index">
          <v-list-item :class="`${item.status === 'unread' ? 'shadow' : ''}`">
            <v-list-item-title class="f14 font1 w500" style="color: #4E444B;">{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle class="f12 font1" style="color: #4E444B;">{{ item.message }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>


      <div class="div-img-user">
        <img :src="imageUser" alt="User Img">
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { toggleDrawer } from '@/store/drawerState.js';
import axiosInstance from '@/plugins/axios';

const dataNotes = ref([]);
const imageUser = ref(null);

const getNotes = async () => {
  try {
    const response = await axiosInstance.get('/notifications');
    dataNotes.value = response.data.result.map((notifications) =>{
      return {
        id: notifications.id,
        title: notifications.title, 
        message: notifications.message,
        status: notifications.status,
      }
    });;
    console.log('Notifications:', response.data.result);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

const getImg = async () =>{
  imageUser.value = localStorage.getItem('userImage')
};

const route = useRoute();

const pageTitles = {
  '/home': 'Dashboard',
  '/home/students': 'Student Management',
  '/home/student-registration': 'Students',
  '/home/programs': 'Management of Additional Programs',
  '/home/additional-program': 'New Additional Programs',
  '/home/classrooms': 'Classrooms',
  '/home/new-classroom': 'Classroom',
  '/home/new-weekly-schedule': 'Classrooms Schedule',
  '/home/daily-schedule': 'Daily Schedule',
  '/home/centers': 'Centers',
  '/home/new-center': 'New Center',
  '/home/edit-center': 'Edit Center',
  '/home/teachers': 'Teachers',
  '/home/new-teacher': 'New Teacher',
};

const currentTitle = computed(() => {
  if (route.path.startsWith('/home/edit-center')) {
    return 'Edit Center';
  } else if (route.path.startsWith('/home/view-center')) {
    return 'View Center';
  } else if (route.path.startsWith('/home/edit-teacher')) {
    return 'Edit Teacher';
  } else if (route.path.startsWith('/home/view-teacher')) {
    return 'View Teacher';
  } else if (route.path.startsWith('/home/student-profile')) {
    return 'Student Profile';
  } else if (route.path.startsWith('/home/classroom-profile')) {
    return 'Classroom Profile';
  } else if (route.path.startsWith('/home/teacher-profile')) {
    return 'Teacher Profile';
  } else if (route.path.startsWith('/home/edit-student')) {
    return 'Edit Student';
  } else if (route.path.startsWith('/home/view-student')) {
    return 'View Student';
  } else if (route.path.startsWith('/home/edit-program')) {
    return 'Edit Program';
  } else if (route.path.startsWith('/home/view-program')) {
    return 'View Program';
  } else if (route.path.startsWith('/home/edit-additional-program')) {
    return 'Edit Additional Program';
  }
  return pageTitles[route.path] || 'Dashboard';
});

const subTitle = {
  '/home': 'Home',
  '/home/students': '',
  '/home/student-registration': 'Registration',
  '/home/programs': 'Organize and Manage the Programs',
  '/home/additional-program': 'Add and customize a new program',
  '/home/classrooms': '',
  '/home/new-classroom': 'Register',
  '/home/new-weekly-schedule': 'Organize your class efficiently',
  '/home/daily-schedule': 'Organize Your Day',
  '/home/student-profile': 'Profile',
  '/home/centers': 'Centers',
  '/home/new-center': 'Add a new center',
  '/home/edit-center': '',
  '/home/teachers': 'Teachers',
  '/home/new-teacher': 'Add a new teacher',
}

const currentSubTitle = computed(() => {
  return subTitle[route.path] || '';
});


onMounted(() => {
  getNotes();
  getImg();
});
</script>

<style lang="scss">

#navbar{
  width: calc(100% - 156px);
  background-color: #F0F0F0 ;
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

    .btn-menu{
     background-color: transparent;
     width: 36px;
     min-width: 36px;
     height: 36px;
     min-height: 36px;

     .v-icon{
       color: #7583D9;
     }
    }

    @media screen and (min-width: 1000px) {
      .btn-menu{
        display: none;
      }
      
    }

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

.v-list{
  border: 1px solid #7583D9!important;
}

.shadow{
  background-color: rgba(#000000, 0.1)!important;
}

.v-list-item{
  padding-block: 0px!important;
  margin: 0px;
  height: 40px;
  min-height: 40px!important;
  min-width: 200px;
}

</style>