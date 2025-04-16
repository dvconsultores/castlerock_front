<template>
  <div id="classrooms">
    <v-data-table :items="dataClassrooms" :headers="headers" hide-default-footer>
      <template v-slot:top>
        <div class="flex gap4 center" style="background-color: #F0F0F0 ;">
          <v-text-field
            v-model="searchQuery"
            class="login-textfield"
            placeholder="Search Classrooms"
            variant="solo" 
            flat
            hide-details
            append-inner-icon="mdi-magnify"
          ></v-text-field>

          <v-btn flat id="btn-search">
            <v-icon color="#FFFFFF" class="mr-3">mdi-calendar</v-icon>
            New Weekly Enrollment
          </v-btn>

          <v-btn flat id="btn-search-mobile">
            <v-icon color="#FFFFFF" class="mr-3">mdi-calendar</v-icon>
          </v-btn>
        </div>
      </template>

      <template v-slot:item.classroom_img="{ item }">
        <div class="card-img-table">
          <img :src="item.classroom_img" alt="Img">
        </div>
      </template>

      <template v-slot:item.center="{ item }">
        <div class="center">
          <span class="color-font-center">{{ item.center }}</span>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="flex center gap2">
          <v-icon color="#474649" size="24" class="pointer" @click="$router.push('/home/new-weekly-schedule')">mdi-calendar</v-icon>
          <v-icon color="#474649" size="24" class="pointer">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="openDelete">mdi-trash-can-outline</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-btn flat class="btn-floating" @click="$router.push('/home/new-classroom')">
      <img src="@/assets/sources/icons/plus.svg" alt="Btn">
    </v-btn>

    <v-dialog v-model="dialogDeleteClassroom" content-class="dialogDeleteClassroom" persistent>
      <v-card class="card-delete">
        <img src="@/assets/sources/icons/trash.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to delete this classroom?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">Guppies,</span> Center 1 </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="closeDelete">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationClassroom" content-class="dialogConfirmationClassroom" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The record of student <span class="w600" style="color: #7583D9;">Guppies</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1">Management</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmation">New Classroom</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import guppie from '@/assets/sources/images/guppie.png';
import lion from '@/assets/sources/images/lion.png';

const dialogDeleteClassroom = ref(false);
const dialogConfirmationClassroom = ref(false);

const closeDelete = () => {
  dialogDeleteClassroom.value = false;
};

const closeConfirmation = () => {
  dialogConfirmationClassroom.value = false;
};

const openDelete = () => {
  dialogDeleteClassroom.value = true;
};

const openConfirmation = () => {
  dialogDeleteClassroom.value = false;
  dialogConfirmationClassroom.value = true;
};

const headers = ref([
    { title: '', key: 'classroom_img', sortable: false },
    { title: 'Id.', key: 'id_classroom', align:'center', sortable: false },
    { title: 'Activity Type', key: 'classroom', align:'center', sortable: false },
    { title: 'Program', key: 'program', align: 'center', sortable: false  },
    { title: 'Center', key: 'center', align: 'center', sortable: false  },
    { title: '# Students', key: 'number_students', align: 'center', sortable: false  },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const dataClassrooms = ref([
    {
      classroom_img: guppie,
      id_classroom: '1',
      classroom: 'Guppies',
      program: 'Primary',
      center: 'Center 1',
      number_students: 8,
    },
    {
      classroom_img: lion,
      id_classroom: '2',
      classroom: 'Lion',
      program: 'Toddler',
      center: 'Center 2',
      number_students: 10,
    },
    {
      classroom_img: guppie,
      id_classroom: '3',
      classroom: 'Guppies',
      program: 'Primary',
      center: 'Center 1',
      number_students: 8,
    },
    {
      classroom_img: lion,
      id_classroom: '4',
      classroom: 'Lion',
      program: 'Toddler',
      center: 'Center 2',
      number_students: 10,
    },
    {
      classroom_img: guppie,
      id_classroom: '5',
      classroom: 'Guppies',
      program: 'Primary',
      center: 'Center 1',
      number_students: 8,
    },
    {
      classroom_img: lion,
      id_classroom: '6',
      classroom: 'Lion',
      program: 'Toddler',
      center: 'Center 2',
      number_students: 10,
    },
    {
      classroom_img: guppie,
      id_classroom: '7',
      classroom: 'Guppies',
      program: 'Primary',
      center: 'Center 1',
      number_students: 8,
    },
    {
      classroom_img: lion,
      id_classroom: '8',
      classroom: 'Lion',
      program: 'Toddler',
      center: 'Center 2',
      number_students: 10,
    },
  ])
</script>

<style lang="scss">
@import '@/assets/styles/pages/classrooms.scss';
</style>


