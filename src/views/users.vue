<template>
  <div id="users">
    <v-data-table :items="filteredDataUsers" :headers="headers" :items-per-page="15">
      <template v-slot:top>
        <v-text-field
          v-model="searchQuery"
          class="login-textfield"
          placeholder="Search Users"
          variant="solo" 
          flat
          maxlength="150"
          hide-details
          append-inner-icon="mdi-magnify"
        ></v-text-field>
      </template>

      <template v-slot:item.user_img="{ item }">
        <div class="card-img-table">
          <img :src="item.user_img" alt="Img">
        </div>
      </template>

      <template v-slot:item.center="{ item }">
        <div class="center">
          <span class="color-font-center">{{ item.center }}</span>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="flex center gap2">
          <v-icon color="#474649" size="24" class="pointer" @click="$router.push(`/home/view-user/${item.id}`)">mdi-eye-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="$router.push(`/home/edit-user/${item.id}`)">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="openDelete(item)">mdi-trash-can-outline</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-btn flat class="btn-floating" @click="$router.push('/home/new-user')">
      <img src="@/assets/sources/icons/plus.svg" alt="Btn">
    </v-btn>

    <v-dialog v-model="dialogDelete" content-class="dialogDelete" persistent>
      <v-card class="card-delete">
        <img src="@/assets/sources/icons/trash.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to delete this user?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">{{ userName }},</span> {{ userRole }} </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation" :loading="loadingConfirmation">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="dialogDelete = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmation" content-class="dialogConfirmation" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The record of the user <span class="w600" style="color: #7583D9;">{{ userName }}</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="refreshData">Users Management</v-btn>
          <v-btn flat class="btn2" @click="$router.push('/home/additional-program')">New User</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRoute } from 'vue-router';

const dialogDelete = ref(false);
const dialogConfirmation = ref(false);
const dataUsers = ref([]);
const showAlert = inject('showAlert');
const searchQuery = ref('');
const userName = ref('');
const userRole = ref('');
const loadingConfirmation = ref(false);
const idUsers = ref(null);


const openDelete = (item) => {
  dialogDelete.value = true;
  idUsers.value = item.id;
  userName.value= item.name;
  userRole.value = item.role;
};

const headers = ref([
    { title: '', key: 'user_img', sortable: false },
    { title: 'Id.', key: 'id_users', align:'center', sortable: false },
    { title: 'Name', key: 'name', align:'center', sortable: false },
    { title: 'Email', key: 'email', align: 'center', sortable: false  },
    { title: 'Role', key: 'role', align: 'center', sortable: false  },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const filteredDataUsers = computed(() => {
  if (!searchQuery.value) return dataUsers.value;
  
  const query = searchQuery.value.toLowerCase();
  return dataUsers.value.filter(users => {
    const safeToString = (value) => value ? value.toString().toLowerCase() : '';
    return (
      safeToString(users.name).includes(query) ||
      safeToString(users.email).includes(query) ||
      safeToString(users.role).includes(query)
    );
  }
  );
});

const getDataUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    dataUsers.value = response.data.result.map((users, index) =>{
      return {
        id: users.id,
        id_users: index + 1,
        name: users.firstName + ' ' + users.lastName,
        email: users.email,
        role: users.role,
        user_img: users.image,
      }
    });
  } catch (error) {
    showAlert('Error fetching users', 'error');
  }
};

const openConfirmation = async () => {
  loadingConfirmation.value = true;

  try{
    const response = await axiosInstance.delete(`/users/${idUsers.value}`);
    loadingConfirmation.value = false;
    dialogDelete.value = false;
    dialogConfirmation.value = true;
  }catch(error){
    loadingConfirmation.value = false;
    showAlert('Error deleting user', 'error');
  }
};

const refreshData = () => {
  dialogConfirmation.value = false;
  getDataUsers();
};  

onMounted(() => {
  getDataUsers();
});

</script>

<style lang="scss">
@import '@/assets/styles/pages/users.scss';
</style>


