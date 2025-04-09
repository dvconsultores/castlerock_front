<template>
  <div id="students">
    <v-data-table :items="dataStudents" :headers="headers" hide-default-footer>
      <template v-slot:top>
        <v-text-field
          v-model="searchQuery"
          class="login-textfield"
          placeholder="Search Student"
          variant="solo" 
          flat
          hide-details
          append-inner-icon="mdi-magnify"
        ></v-text-field>
      </template>

      <template v-slot:item.id_student="{ item }">
        <div class="flex center gap4">
          <div class="card-img-table">
            <img :src="item.student_img" alt="Img">
          </div>
          <span class="f16 w700" style="color: #474649;">{{ item.id_student }}</span>
        </div>
      </template>

      <template v-slot:item.center="{ item }">
        <div class="center">
          <span class="color-font-center">{{ item.center }}</span>
        </div>
      </template>

      <template v-slot:item.classroom="{ item }">
        <div class="center">
          <span class="color-font-classroom">{{ item.classroom }}</span>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="flex center gap2">
          <v-icon color="#474649" size="24" class="pointer" @click="$router.push('/home/student-profile')">mdi-eye-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="openDelete">mdi-trash-can-outline</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-btn flat class="btn-floating" @click="$router.push('/home/student-registration')">
      <img src="@/assets/sources/icons/plus.svg" alt="Btn">
    </v-btn>

    <v-dialog v-model="dialogDelete" content-class="dialogDelete" persistent>
      <v-card class="card-delete">
        <img src="@/assets/sources/icons/trash.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to delete this student's record?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w600" style="color: #7583D9;">Sophia Johnson</span>
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
        <span class="f16 w400 tcenter">The record of student <span class="w600" style="color: #7583D9;">Sophia Johnson</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1">Students Management</v-btn>
          <v-btn flat class="btn2" @click="closeDelete">New student</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import imgStudent from '@/assets/sources/images/student-1.png';

const dialogDelete = ref(false);
const dialogConfirmation = ref(false);

const closeDelete = () => {
  dialogDelete.value = false;
};


const openDelete = () => {
  dialogDelete.value = true;
};

const openConfirmation = () => {
  dialogDelete.value = false;
  dialogConfirmation.value = true;
};

const headers = ref([
    { title: 'Id.', key: 'id_student', align:'center', sortable: false },
    { title: 'Student Name', key: 'name', align:'center', sortable: false },
    { title: 'Age', key: 'age', align: 'center', sortable: false  },
    { title: 'Gender', key: 'gender', align: 'center', sortable: false  },
    { title: 'Center', key: 'center', align: 'center', sortable: false  },
    { title: 'Program', key: 'program', align: 'center', sortable: false  },
    { title: 'Classroom', key: 'classroom', align: 'center', sortable: false  },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const dataStudents = ref([
    {
      id_student: '1',
      student_img: imgStudent,
      name: 'Sophia Johnson',
      age: '1Y 3M',
      gender: 'Female',
      center: 'Center 1',
      program: 'Primary',
      classroom: 'Lions',
    },
    {
      id_student: '2',
      student_img: imgStudent,
      name: 'John MG',
      age: '9M',
      gender: 'Female',
      center: 'Center 2',
      program: 'Toddler',
      classroom: 'Guppies',
    },
    {
      id_student: '3',
      student_img: imgStudent,
      name: 'John MG',
      age: '9M',
      gender: 'Female',
      center: 'Center 2',
      program: 'Toddler',
      classroom: 'Guppies',
    },
    {
      id_student: '4',
      student_img: imgStudent,
      name: 'John MG',
      age: '9M',
      gender: 'Female',
      center: 'Center 2',
      program: 'Toddler',
      classroom: 'Guppies',
    },
    {
      id_student: '5',
      student_img: imgStudent,
      name: 'John MG',
      age: '9M',
      gender: 'Female',
      center: 'Center 2',
      program: 'Toddler',
      classroom: 'Guppies',
    },
    {
      id_student: '6',
      student_img: imgStudent,
      name: 'John MG',
      age: '9M',
      gender: 'Female',
      center: 'Center 2',
      program: 'Toddler',
      classroom: 'Guppies',
    },
    {
      id_student: '7',
      student_img: imgStudent,
      name: 'John MG',
      age: '9M',
      gender: 'Female',
      center: 'Center 2',
      program: 'Toddler',
      classroom: 'Guppies',
    },
    {
      id_student: '8',
      student_img: imgStudent,
      name: 'John MG',
      age: '9M',
      gender: 'Female',
      center: 'Center 2',
      program: 'Toddler',
      classroom: 'Guppies',
    },
    {
      id_student: '9',
      student_img: imgStudent,
      name: 'John MG',
      age: '9M',
      gender: 'Female',
      center: 'Center 2',
      program: 'Toddler',
      classroom: 'Guppies',
    },
  ])
</script>

<style lang="scss">
@import '@/assets/styles/pages/students.scss';
</style>


