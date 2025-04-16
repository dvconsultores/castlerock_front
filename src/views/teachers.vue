<template>
  <div id="teachers">
    <v-data-table :items="dataTeachers" :headers="headers" hide-default-footer>
      <template v-slot:top>
        <div class="flex gap4 center" style="background-color: #F0F0F0 ;">
          <v-text-field
            v-model="searchQuery"
            class="login-textfield"
            placeholder="Search Teacher"
            variant="solo" 
            flat
            hide-details
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        </div>
      </template>

      <template v-slot:item.teacher_img="{ item }">
        <div class="card-img-table">
          <img :src="item.teacher_img" alt="Img">
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

    <v-btn flat class="btn-floating" @click="$router.push('/home/new-teacher')">
      <img src="@/assets/sources/icons/plus.svg" alt="Btn">
    </v-btn>

    <v-dialog v-model="dialogDeleteTeacher" content-class="dialogDeleteTeacher" persistent>
      <v-card class="card-delete">
        <img src="@/assets/sources/icons/trash.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to delete this teacher?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">Teacher 1</span> Center 1 </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="closeDelete">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationTeacher" content-class="dialogConfirmationTeacher" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The record of the teacher <span class="w600" style="color: #7583D9;">Teacher New</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1">Management</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmation">New Teacher</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import teacher1 from '@/assets/sources/images/user.png'
import teacher2 from '@/assets/sources/images/user-2.png'

const dialogDeleteTeacher = ref(false);
const dialogConfirmationTeacher = ref(false);

const closeDelete = () => {
  dialogDeleteTeacher.value = false;
};

const closeConfirmation = () => {
  dialogConfirmationTeacher.value = false;
};

const openDelete = () => {
  dialogDeleteTeacher.value = true;
};

const openConfirmation = () => {
  dialogDeleteTeacher.value = false;
  dialogConfirmationTeacher.value = true;
};

const headers = ref([
    { title: '', key: 'teacher_img', sortable: false },
    { title: 'Id.', key: 'id_teacher', align:'center', sortable: false },
    { title: 'Teacher Name', key: 'teacher_name', align:'center', sortable: false },
    { title: 'Location', key: 'teacher_location', align: 'center', sortable: false  },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const dataTeachers = ref([
    {
      teacher_img: teacher1,
      id_teacher: '1',
      teacher_name: 'Samantha Taylor',
      teacher_location: 'Miami',
      number_students: 8,
    },
    {
      teacher_img: teacher2,
      id_teacher: '2',
      teacher_name: 'Olivia Bennett',
      teacher_location: 'New York',
    },
  ])
</script>

<style lang="scss">
@import '@/assets/styles/pages/teachers.scss';
</style>


