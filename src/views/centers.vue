<template>
  <div id="centers">
    <v-data-table :items="dataCenters" :headers="headers" hide-default-footer>
      <template v-slot:top>
        <div class="flex gap4 center" style="background-color: #F0F0F0 ;">
          <v-text-field
            v-model="searchQuery"
            class="login-textfield"
            placeholder="Search Center"
            variant="solo" 
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
          <v-icon color="#474649" size="24" class="pointer">mdi-calendar</v-icon>
          <v-icon color="#474649" size="24" class="pointer">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="openDelete">mdi-trash-can-outline</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-btn flat class="btn-floating" @click="$router.push('/home/new-center')">
      <img src="@/assets/sources/icons/plus.svg" alt="Btn">
    </v-btn>

    <v-dialog v-model="dialogDeleteCenter" content-class="dialogDeleteCenter" persistent>
      <v-card class="card-delete">
        <img src="@/assets/sources/icons/trash.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to delete this Center?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">Montessori Castle Rock,</span> Center 1 </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="closeDelete">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationCenter" content-class="dialogConfirmationCenter" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The record of the center <span class="w600" style="color: #7583D9;">Montessori Castle Rock</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1">Management</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmation">New Center</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import center1 from '@/assets/sources/images/banner_1.png'
import center2 from '@/assets/sources/images/banner_2.png'

const dialogDeleteCenter = ref(false);
const dialogConfirmationCenter = ref(false);

const closeDelete = () => {
  dialogDeleteCenter.value = false;
};

const closeConfirmation = () => {
  dialogConfirmationCenter.value = false;
};

const openDelete = () => {
  dialogDeleteCenter.value = true;
};

const openConfirmation = () => {
  dialogDeleteCenter.value = false;
  dialogConfirmationCenter.value = true;
};

const headers = ref([
    { title: '', key: 'center_img', sortable: false },
    { title: 'Id.', key: 'id_center', align:'center', sortable: false },
    { title: 'Center Name', key: 'center_name', align:'center', sortable: false },
    { title: 'Location', key: 'center_location', align: 'center', sortable: false  },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const dataCenters = ref([
    {
      center_img: center1,
      id_center: '1',
      center_name: 'Montessori Castle Rock',
      center_location: 'Miami',
      number_students: 8,
    },
    {
      center_img: center2,
      id_center: '2',
      center_name: 'Montessori Castle Rock',
      center_location: 'New York',
    },
  ])
</script>

<style lang="scss">
@import '@/assets/styles/pages/centers.scss';
</style>


