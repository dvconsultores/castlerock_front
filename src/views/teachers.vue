<template>
  <div id="teachers">
    <v-data-table :items="filteredTeachers" :headers="headers" :items-per-page="15">
      <template v-slot:top>
        <div class="flex gap4 center" style="background-color: #F0F0F0 ;">
          <v-text-field
            v-model="searchQuery"
            class="login-textfield"
            placeholder="Search Teacher"
            variant="solo" 
            flat
            maxlength="150"
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

       <template v-slot:item.classes="{ item }">
        <div class="center" v-html="item.classes"></div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="flex center gap2">
          <!-- <v-icon color="#474649" size="24" class="pointer">mdi-eye-outline</v-icon> -->
          <v-icon color="#474649" size="24" class="pointer" @click="() => $router.push(`/home/edit-teacher/${item.id}`)">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="openDelete(item)">mdi-trash-can-outline</v-icon>
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
        <span class="w600" style="color: #7583D9;">{{ nameTeacher }}</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation" :loading="loadingConfirmation">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="dialogDeleteTeacher = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationTeacher" content-class="dialogConfirmationTeacher" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The record of the teacher <span class="w600" style="color: #7583D9;">{{ nameTeacher }}</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="refreshTeacher">Management</v-btn>
          <v-btn flat class="btn2" @click="$router.push('/home/new-teacher')">New Teacher</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import axiosInstance from '@/plugins/axios';


const dialogDeleteTeacher = ref(false);
const dialogConfirmationTeacher = ref(false);
const loadingConfirmation = ref(false);
const showAlert = inject('showAlert');

const closeConfirmation = () => {
  dialogConfirmationTeacher.value = false;
};

const openDelete = (item) => {
  dialogDeleteTeacher.value = true;
  idTeacher.value = item.id;
  nameTeacher.value = item.teacher_name;  
};

const openConfirmation = async () => {
  loadingConfirmation.value = true;
  try{
    const response = await axiosInstance.delete(`/teachers/${idTeacher.value}`);
    loadingConfirmation.value = false;
    dialogDeleteTeacher.value = false;
    dialogConfirmationTeacher.value = true

  }catch(error){
    showAlert('Failed to delete teacher', 'error');
    loadingConfirmation.value = false;
  }
};

const refreshTeacher = async () =>{
  dialogConfirmationTeacher.value = false;
  getTeachers();
};

const dataTeachers = ref([]);
const searchQuery = ref('');
const idTeacher = ref(null);
const nameTeacher = ref('');

const filteredTeachers = computed(() => {
  if (!searchQuery.value) return dataTeachers.value;
  
  const query = searchQuery.value.toLowerCase();
  return dataTeachers.value.filter(teacher => {
    const safeToString = (value) => value ? value.toString().toLowerCase() : '';
    return (
      safeToString(teacher.teacher_name).includes(query) ||
      safeToString(teacher.center).includes(query) ||
      safeToString(teacher.classes).includes(query)
    );
  }
  );
});


const headers = ref([
    { title: '', key: 'teacher_img', sortable: false },
    { title: 'Id.', key: 'id_teacher', align:'center', sortable: false },
    { title: 'Teacher Name', key: 'teacher_name', align:'center', sortable: false },
    { title: 'Center', key: 'center', align:'center', sortable: false },
    { title: 'Classes', key: 'classes', align:'center', sortable: false },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const getTeachers = async () => {
  try {
    const response = await axiosInstance.get('/teachers');

    dataTeachers.value = response.data.result.map((teacher, index) => {
      return {
        id: teacher.id,
        id_teacher: index + 1,
        teacher_name: teacher.user.firstName + ' ' + teacher.user.lastName,
        center: teacher.campus.name,
        classes: Array.isArray(teacher.classes) ? teacher.classes.map(c => c.name).join('<br>') : '',
        teacher_img: teacher.user.image,
        actions: ''
      };
    });
  } catch (error) {
    showAlert('Error', 'error');
  }
}

onMounted(() => {
  getTeachers();
});

</script>

<style lang="scss">
@import '@/assets/styles/pages/teachers.scss';
</style>


