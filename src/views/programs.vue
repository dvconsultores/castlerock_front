<template>
  <div id="programs">
    <v-data-table :items="dataPrograms" :headers="headers" hide-default-footer>
      <template v-slot:top>
        <v-text-field
          v-model="searchQuery"
          class="login-textfield"
          placeholder="Search Additional Programs"
          variant="solo" 
          flat
          hide-details
          append-inner-icon="mdi-magnify"
        ></v-text-field>
      </template>

      <template v-slot:item.program_img="{ item }">
        <div class="card-img-table">
          <img :src="item.program_img" alt="Img">
        </div>
      </template>

      <template v-slot:item.center="{ item }">
        <div class="center">
          <span class="color-font-center">{{ item.center }}</span>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="flex center gap2">
          <v-icon color="#474649" size="24" class="pointer">mdi-eye-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="openDelete">mdi-trash-can-outline</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-btn flat class="btn-floating" @click="$router.push('/additional-program')">
      <img src="@/assets/sources/icons/plus.svg" alt="Btn">
    </v-btn>

    <v-dialog v-model="dialogDelete" content-class="dialogDelete" persistent>
      <v-card class="card-delete">
        <img src="@/assets/sources/icons/trash.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to delete this program?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">Swimming,</span> Center 1 </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="closeDelete">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmation" content-class="dialogConfirmation" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The record of student <span class="w600" style="color: #7583D9;">Swimming</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1">Programs Management</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmation">New Program</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import program1 from '@/assets/sources/images/program-1.jpg';
import program2 from '@/assets/sources/images/program-2.jpg';

const dialogDelete = ref(false);
const dialogConfirmation = ref(false);

const closeDelete = () => {
  dialogDelete.value = false;
};

const closeConfirmation = () => {
  dialogConfirmation.value = false;
};

const openDelete = () => {
  dialogDelete.value = true;
};

const openConfirmation = () => {
  dialogDelete.value = false;
  dialogConfirmation.value = true;
};

const headers = ref([
    { title: '', key: 'program_img', sortable: false },
    { title: 'Id.', key: 'id_student', align:'center', sortable: false },
    { title: 'Activity Type', key: 'activity_type', align:'center', sortable: false },
    { title: 'Days', key: 'days', align: 'center', sortable: false  },
    { title: 'Center', key: 'center', align: 'center', sortable: false  },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const dataPrograms = ref([
    {
      program_img: program1,
      id_student: '1',
      activity_type: 'Dance',
      days: 'Mon - Tue',
      center: 'Center 1',
    },
    {
      program_img: program2,
      id_student: '2',
      activity_type: 'Swimming',
      days: 'Wed - Thu - Fri',
      center: 'Center 1',
    },
    {
      program_img: program1,
      id_student: '3',
      activity_type: 'Dance',
      days: 'Mon - Tue',
      center: 'Center 1',
    },
    {
      program_img: program2,
      id_student: '4',
      activity_type: 'Swimming',
      days: 'Wed - Thu - Fri',
      center: 'Center 1',
    },
  ])
</script>

<style lang="scss">
@import '@/assets/styles/pages/programs.scss';
</style>


