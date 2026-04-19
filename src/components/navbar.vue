<template>
  <nav id="navbar">
    <div class="left-container">
      <v-icon @click="handleBack">mdi-chevron-left</v-icon>
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

      <v-icon v-if="isOwner" @click="$router.push('/home/payment-renewal')" class="payment">
        mdi-cash-sync
      </v-icon>

      <v-icon v-if="isAdmin" @click="openDialogCampus" class="payment">
        mdi-home-group
      </v-icon>

      <v-menu
        transition="scale-transition"
      >
        <template v-if="hasUnreadNotes" v-slot:activator="{ props }">
          <img v-bind="props" src="@/assets/sources/icons/bell-notification.svg" alt="Bell" class="img-bell pointer">
        </template>

        <template v-else-if="!hasUnreadNotes" v-slot:activator="{ props }">
          <img v-bind="props" src="@/assets/sources/icons/bell-no-notification.svg" alt="Bell" class="img-bell pointer">
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in dataNotes" :key="index" :class="`${item.status === 'unread' ? 'shadow' : ''}`">
            <v-list-item-title class="f14 font1 w500" style="color: #4E444B;">{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle class="f12 font1" style="color: #4E444B;">{{ item.message }}</v-list-item-subtitle>
            <v-list-item-action>
              <v-icon v-if="item.status === 'unread'" class="mt-1 pointer" color="#7583D9" style="font-size: 20px;" @click.stop="editStatus(item)">mdi-email-open-outline</v-icon>
              <v-icon v-if="item.status === 'read'" class="mt-1" color="#7583D9" style="font-size: 20px;">mdi-email</v-icon>
              <v-icon class="mt-1 ml-2 pointer" color="#7583D9" style="font-size: 20px;" @click.stop="deleteNote(item)">mdi-trash-can-outline</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>


      <div class="div-img-user">
        <img :src="imageUser" alt="User Img">
      </div>
    </div>

    <v-dialog v-model="dialogSelectCampus" persistent fullscreen id="dialog-navbar">
      <v-card class="card-dialog">
        <v-btn class="btn-close" @click="dialogSelectCampus = false" flat>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h2 class="tcenter">App Strutis</h2>
        <p class="subtitle tcenter">Choose a center to see more information</p>

        <v-data-table
          :items="filteredCenters"
          :headers="headers"
          :items-per-page="1500"
          hide-default-footer
          >
          <template v-slot:top>
            <div class="flex gap4 center" style="background-color: #F0F0F0 ;">
              <v-text-field
                v-model="searchQuery"
                class="login-textfield"
                placeholder="Search Center"
                variant="solo" 
                maxLength="150"
                autocomplete="off"
                flat
                hide-details
                append-inner-icon="mdi-magnify"
              ></v-text-field>
            </div>
          </template>

          <template v-slot:item.center_img="{ item }">
            <div class="card-img-table">
              <img :src="item.center_img" alt="Img">
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="flex center gap2">
              <v-icon color="#474649" size="24" class="pointer" @click="selectCenter(item)">mdi-check-outline</v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showAlert = inject('showAlert');

const handleBack = () => {
  router.go(-1);
};

import { useRoute } from 'vue-router';
import { toggleDrawer } from '@/store/drawerState.js';
import axiosInstance from '@/plugins/axios';


const dialogSelectCampus = ref(false);
const openDialogCampus = () => {
  dialogSelectCampus.value = true;
  getCenters();
};
const dataCenters = ref([]);
const getCenters = async () => {
  try {
    const response = await axiosInstance.get('/campus');
    
    dataCenters.value = response.data.result.map((center, index) => {
      const sub = Array.isArray(center.subscriptions) && center.subscriptions.length > 0 ? center.subscriptions[0] : null;
      return {
        id: center.id,
        id_center: index + 1,
        // center_img: center.image,
        name: center.name,
        // address: center.address,
        // next_billing_date: sub ? formatDate(sub.nextBillingDate) : null,
        // subscription_status: sub ? capitalizeFirst(sub.status) : null,
        actions: '',
      }
    });
  } catch (error) {
    showAlert('Error fetching centers', 'error');
  }
};

const selectCenter = async (item) => {
  try {
    if (!item || !item.id) return;
    localStorage.setItem('campusIdForAdmin', String(item.id));
    dialogSelectCampus.value = false;
    router.push('/home');
    window.location.reload();
  } catch (error) {
    console.error('Error selecting center:', error);
    showAlert && showAlert('Error selecting center', 'error');
  }
};

const filteredCenters = computed(() => {
  if (!searchQuery.value) return dataCenters.value;
  
  const query = searchQuery.value.toLowerCase();
  return dataCenters.value.filter(center =>
    center.name.toLowerCase().includes(query)
  );
});

const headers = ref([
    // { title: '', key: 'center_img', align:'center', sortable: false },
    { title: 'Number', key: 'id_center', align:'center', sortable: false },
    { title: 'Name', key: 'name', align:'center', sortable: false },
    // { title: 'Address', key: 'address', align: 'center', sortable: false },
    // { title: 'Next Billing Date', key: 'next_billing_date', align: 'center', sortable: false },
    // { title: 'Suscription Status', key: 'subscription_status', align: 'center', sortable: false },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false },
]);
const searchQuery = ref('');


const isAdmin = localStorage.getItem('userRole') === 'ADMIN';
const isTeacher = localStorage.getItem('userRole') === 'TEACHER';
const isOwner = localStorage.getItem('userRole') === 'OWNER';
const dataNotes = ref([]);
const hasUnreadNotes = computed(() => {
  return dataNotes.value.some(note => note.status === 'unread');
});
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
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

const editStatus = async (item) => {
  try {
    const response = await axiosInstance.patch(`/notifications/${item.id}`, {
      status: 'read'
    });
    getNotes();
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

const deleteNote = async (item) => {
  try {
    const response = await axiosInstance.delete(`/notifications/${item.id}`);
    getNotes();
  } catch (error) {
    console.error('Error updating status:', error);
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
  '/home/users': 'Users',
  '/home/new-user': 'New user',
  '/home/new-classroom': 'New Classroom',
  '/home/withdrawal-dates': 'Withdrawal Dates',
  '/home/new-enrollments': 'Future Enrollments',
  '/home/daily-roster': 'Daily Roster',
  '/home/inactive-students': 'Inactive Students',
  '/home/weekly-roster': 'Weekly Roster',
  '/home/weekly-programs-roster': 'Weekly Programs Roster',
  '/home/report': 'Reports Section',
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
  } else if (route.path.startsWith('/home/edit-teacher')) {
    return 'Edit Teacher';
  } else if (route.path.startsWith('/home/edit-classroom')) {
    return 'Edit Classroom';
  } else if (route.path.startsWith('/home/view-additional-program')) {
    return 'View Additional Program';
  } else if (route.path.startsWith('/home/edit-weekly-schedule')) {
    return 'Edit Weekly Schedule';
  } else if (route.path.startsWith('/home/daily-schedule')) {
    return 'Daily Schedule';
  } else if (route.path.startsWith('/home/view-daily-schedule')) {
    return 'View Daily Schedule';
  } else if (route.path.startsWith('/home/edit-daily-attendance')) {
    return 'Daily Attendance';
  }else if (route.path.startsWith('/home/edit-daily-schedule')) {
    return 'Edit daily schedule';
  }else if (route.path.startsWith('/home/view-daily-spot')) {
    return 'Daily Spot';
  }else if (route.path.startsWith('/home/payment-renewal')) {
    return 'Payment Renewal';
  } return pageTitles[route.path] || 'Dashboard';
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
  '/home/centers': '',
  '/home/new-center': 'Add a new center',
  '/home/edit-center': '',
  '/home/teachers': 'Teachers',
  '/home/new-teacher': 'Add a new teacher',
  '/home/users': 'Users management',
  '/home/teachers': 'Teachers management',
  '/home/new-classroom': 'Add a new classroom',
}

const currentSubTitle = computed(() => {
  if(route.path.startsWith('/home/edit-daily-attendance')) {
    return 'Manage your daily attendance';
  } else
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
  height: 90px;
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

    .payment{
      color: #7583D9;
      font-size: 24px;
      cursor: pointer;
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
  padding: 8px!important;
}

.shadow{
  background-color: rgba(#000000, 0.1)!important;
}

.v-list-item{
  padding-block: 8px!important;
  margin: 0px;
  height: max-content;
  min-height: max-content!important;
  min-width: 200px;
  margin-bottom: 4px;
}

#dialog-navbar {
  .card-dialog {
    background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #e8f5e9 100%) !important;
    padding: 48px 24px;
    border-radius: 0px !important;
    display: flex;
    max-height: 100vh;
    min-width: 100vw;
    position: relative;

    .btn-close{
      position: absolute;
      top: 16px;
      right: 16px;
      padding: 0!important;
      min-height: 30px!important;
      height: 30px!important;
      min-width: 30px!important;
      width: 30px!important;
      border-radius: 50%;
      display: flex;
      background-color: #6bbdae;
      
      .v-icon{
        color: #fff;
        font-size: 18px;
      }
    }
    
    
    h2 {
      font-weight: 700;
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 8px;
    }

    .subtitle {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 40px;
    }

     .v-data-table{
      max-height: 60vh;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    .v-input{
      background-color: transparent!important; // Modificado
    }
    .login-textfield{    
      i{
        color: #3C3C434D;
        opacity: .6;
      }

      .v-field{
        border-radius: 16px;
        transition: all .5s ease-in-out;
        ::placeholder{
          color: #3C3C434D;
          opacity: .6;
        }
      }

      .v-field--active{
        border: 1px solid #7583D9;

        i{
          color: #46464C;
        }
      }
      .v-input{
        max-width: 100%;
        width: 100%;
      }
      .v-input__control{
        height: 56px;
        max-width: 100%;
        width: 100%;
      }
  
      .v-field__input{
        max-width: 100%;
        width: 100%;
        padding-block: 5px;
        height: 56px!important;
        min-height: 1px!important;
      }
    }

    .v-table__wrapper {
      table {
        border-collapse: separate;
        border-spacing: 0px;
        background-color: #F0F0F0 ;
      }
    }

    tr th{
      background-color: #F0F0F0 ;
      color: #262262;
      font-size: 16px;
      font-weight: 700!important;
      border: none!important;
      padding-block: 5px 12px!important;
      padding-bottom: 5px!important;
      height: 36px;
      max-height: 36px;
      min-height: 36px;

      // span{
      //   font-size: 14px;
      // }
    }
    
    tr:nth-child(odd){
      background: #FFFFFF!important;
      
      .color-font-center{
        color: #262262;
      }
    }
    
    tr:nth-child(even){
      background: #F0F0F0 !important;

      .color-font-center{
        color: #262262;
      }
    }
    
    
    tr td{
      border: none!important;
      color: #474649;
      font-weight: 700!important;
      font-size: 14px;
      padding-block: 5px 12px!important;
      padding-bottom: 5px!important;
      height: 36px;
      max-height: 36px;
      min-height: 36px;
    }

    td:first-child {
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }

    td:last-child {
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
    }
  }

  .v-data-table-footer{
    background-color: #F0F0F0;
    border-top: 0px solid #E0E0E0!important;
    .v-data-table-footer__items-per-page{
      display: none;      
    }
  }
  }
}

</style>