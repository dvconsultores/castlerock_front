<template>
  <div id="classrooms">
    <v-data-table :items="dataClassroomsFiltered" :headers="headers" :items-per-page="15">
      <template v-slot:top>
        <div class="flex gap4 center" style="background-color: #F0F0F0 ;">
          <v-text-field
            v-model="searchQuery"
            class="login-textfield"
            placeholder="Search Classrooms"
            variant="solo" 
            autocomplete="off"
            maxLength="150"
            flat
            hide-details
            append-inner-icon="mdi-magnify"
          ></v-text-field>

          <v-btn flat id="btn-search" @click="goToNewWeeklySchedule">
            <v-icon color="#FFFFFF" class="mr-3">mdi-calendar</v-icon>
            New Weekly Enrollment
          </v-btn>

          <v-btn flat id="btn-search-mobile" @click="goToNewWeeklySchedule">
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
          <v-icon color="#474649" size="24" class="pointer" @click="goToEditWeeklySchedule(item)">mdi-calendar</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="$router.push(`/home/edit-classroom/${item.id}`)">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="openDelete(item)">mdi-trash-can-outline</v-icon>
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
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">{{ nameClass }},</span> {{ centerName }} </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation" :loading="loadingConfirmation">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="dialogDeleteClassroom = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationClassroom" content-class="dialogConfirmationClassroom" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The record of class <span class="w600" style="color: #7583D9;">{{ nameClass }}</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="refreshData">Management</v-btn>
          <v-btn flat class="btn2" @click="$router.push('/home/new-classroom')">New Classroom</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const dialogDeleteClassroom = ref(false);
const dialogConfirmationClassroom = ref(false);
const showAlert = inject('showAlert');
const searchQuery = ref('');
const idClass = ref('');
const nameClass = ref(''); 
const centerName = ref('');
const loadingConfirmation = ref(false);
const dataClassrooms = ref([]);

const openDelete = (item) => {
  dialogDeleteClassroom.value = true;
  idClass.value = item.id;
  nameClass.value = item.name;
  centerName.value = item.center;
};

const refreshData = () => {
  dialogConfirmationClassroom.value = false;
  getDataClassrooms();
};  

const openConfirmation = async () => {
  loadingConfirmation.value = true;
  
  try{
    const response = await axiosInstance.delete(`/classes/${idClass.value}`);
    loadingConfirmation.value = false;
    dialogDeleteClassroom.value = false;
    dialogConfirmationClassroom.value = true;
  }catch(error){
    loadingConfirmation.value = false;
    showAlert('Error deleting classroom', 'error');
  }
};

const dataClassroomsFiltered = computed(() => {
  if (!searchQuery.value) return dataClassrooms.value;
  
  const query = searchQuery.value.toLowerCase();
  return dataClassrooms.value.filter(classes => {
    const safeToString = (value) => value ? value.toString().toLowerCase() : '';
    return (
      safeToString(classes.name).includes(query) ||
      safeToString(classes.program).includes(query) ||
      safeToString(classes.center).includes(query) ||
      safeToString(classes.number_students).includes(query)
    );
  }
  );
});

const getDataClassrooms = async () => {
  try {
    const response = await axiosInstance.get('/classes');
    dataClassrooms.value = response.data.result.map((classes, index) =>{
      return {
        id: classes.id,
        id_classroom: index + 1,
        name: classes.name,
        program: classes.program,
        center: classes.campus.name,
        number_students: classes.maxCapacity,
        classroom_img: classes.image,
        students_length: classes.students.length,
      }
    });
  } catch (error) {
    showAlert('Error fetching classrooms', 'error');
  }
};

const headers = ref([
    { title: '', key: 'classroom_img', sortable: false },
    { title: 'Id.', key: 'id_classroom', align:'center', sortable: false },
    { title: 'Name', key: 'name', align:'center', sortable: false },
    { title: 'Program', key: 'program', align: 'center', sortable: false  },
    { title: 'Center', key: 'center', align: 'center', sortable: false  },
    { title: 'Max Capacity', key: 'number_students', align: 'center', sortable: false  },
    { title: 'Total Students', key: 'students_length', align: 'center', sortable: false  },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const goToNewWeeklySchedule = () => {
  localStorage.removeItem('idCenter');
  localStorage.removeItem('centerName');
  localStorage.removeItem('idClass');
  localStorage.removeItem('className');
  localStorage.removeItem('idYear');
  localStorage.removeItem('yearName');
  localStorage.removeItem('idMonth');
  localStorage.removeItem('monthName');
  router.push('/home/new-weekly-schedule');
};

const goToEditWeeklySchedule = (item) => {
  localStorage.removeItem('idCenter');
  localStorage.removeItem('centerName');
  localStorage.removeItem('idClass');
  localStorage.removeItem('className');
  localStorage.removeItem('idYear');
  localStorage.removeItem('yearName');
  localStorage.removeItem('idMonth');
  localStorage.removeItem('monthName');
  router.push(`/home/edit-weekly-schedule/${item.id}`);
};

onMounted(() => {
  getDataClassrooms();
});

</script>

<style lang="scss">
@import '@/assets/styles/pages/classrooms.scss';
</style>


